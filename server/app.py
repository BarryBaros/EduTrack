from flask import Flask, jsonify, request, redirect, url_for, flash, session
from flask_migrate import Migrate
from flask_cors import CORS
from server.models import db, Admin, Teacher, Student, Subject, Class, Grade
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from dotenv import load_dotenv
import os
from werkzeug.utils import secure_filename

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure app settings
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit to 16MB

# Enable CORS
CORS(app, supports_credentials=True)

# Initialize extensions
migrate = Migrate(app, db)
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

# ------------------ Routes ------------------

@app.route('/')
def index():
    return 'Hi, welcome to EduTrack!'

# ------------------ TEACHER ROUTES ------------------

# Get all teachers
@app.route('/teachers', methods=['GET'])
def get_teachers():
    try:
        teachers = Teacher.query.all()
        return jsonify([teacher.to_dict() for teacher in teachers]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create a new teacher
@app.route('/teachers', methods=['POST'])
def create_teacher():
    data = request.get_json()
    try:
        if not all(key in data for key in ('staff_id', 'pin_no', 'name')):
            return jsonify({'error': 'Missing required fields'}), 400

        # Check for existing staff_id
        existing_teacher = Teacher.query.filter_by(staff_id=data['staff_id']).first()
        if existing_teacher:
            return jsonify({'error': 'Staff ID already exists'}), 400

        new_teacher = Teacher(
            staff_id=data['staff_id'],
            pin_no=data['pin_no'],
            name=data['name']
        )
        db.session.add(new_teacher)
        db.session.commit()
        return jsonify(new_teacher.to_dict()), 201  # Return created teacher's data
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Delete a teacher
@app.route('/teachers/<int:id>', methods=['DELETE'])
def delete_teacher(id):
    try:
        teacher = Teacher.query.get_or_404(id)
        db.session.delete(teacher)
        db.session.commit()
        return jsonify({'message': 'Teacher deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------ STUDENT ROUTES ------------------

# Get all students
@app.route('/students', methods=['GET'])
def get_students():
    try:
        students = Student.query.all()
        return jsonify([student.to_dict() for student in students]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/students/name/<string:name>', methods=['GET'])
def get_student_by_name(name):
    student = Student.query.filter_by(name=name).first()
    if student:
        return jsonify(student.to_dict()), 200
    else:
        return jsonify({'error': 'Student not found'}), 404

    student_data = {
        'id': student.id,
        'admission_no': student.admission_no,
        'name': student.name,
        'class_name': student.class_.class_name,
        'grades': [{'subject': grade.subject.name, 'grade': grade.grade} for grade in student.grades],
        'guardian_name': student.guardian_name,
        'guardian_contact': student.guardian_contact,
        'guardian_email': student.guardian_email,
        'image': student.image or '/path/to/default-image.jpg'
    }
    return jsonify(student_data)

# Update student profile
@app.route('/api/student/<int:student_id>', methods=['PUT'])
@login_required
def update_student(student_id):
    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found'}), 404

    if current_user.id != student.id and not isinstance(current_user, Teacher):
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.get_json()
    try:
        new_subject = Subject(name=data['name'])
        db.session.add(new_subject)
        db.session.commit()
        return jsonify({'message': 'Subject created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------ CLASS ROUTES ------------------

# Get all classes
@app.route('/get_classes', methods=['GET'])
def get_classes():
    try:
        classes = Class.query.all()
        return jsonify([cls.to_dict() for cls in classes]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create a new class
@app.route('/classes', methods=['POST'])
def create_class():
    data = request.get_json()
    try:
        new_class = Class(
            class_name=data['class_name'],
            teacher_id=data['teacher_id'],
            class_capacity=data['class_capacity']
        )
        db.session.add(new_class)
        db.session.commit()
        return jsonify({'message': 'Class created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/classes/<int:id>', methods=['DELETE'])
def delete_class(id):
    try:
        classes = Class.query.get_or_404(id)
        db.session.delete(classes)
        db.session.commit()
        return jsonify({'message': 'Class deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------ ADMIN ROUTES ------------------

# Admin Login Route
@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        staff_id = request.form['staff_id']
        pin_no = request.form['pin_no']
        admin = Admin.query.filter_by(staff_id=staff_id).first()

        if admin and admin.pin_no == pin_no:  # Check the PIN without hashing
            login_user(admin)  # Log the admin in and create a session
            flash(f'Welcome {admin.staff_id}! You are logged in.')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid staff ID or PIN number. Please try again.')

    return render_template('admin_login.html')

# Admin Dashboard Route
@app.route('/admin_dashboard')
@login_required
def upload_student_image(student_id):
    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found'}), 404

    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided.'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file.'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    student.image = file_path
    db.session.commit()

    return jsonify({'message': 'Image uploaded successfully!', 'image_path': student.image}), 201

# Fetch student's grades
@app.route('/api/students/<int:student_id>/grades', methods=['GET'])
@login_required
def get_grades(student_id):
    student = Student.query.get_or_404(student_id)

    if current_user.id != student.id and not isinstance(current_user, Teacher):
        return jsonify({'error': 'Unauthorized access'}), 403

    grades = Grade.query.filter_by(student_id=student.id).all()
    grade_data = [{'subject': grade.subject.name, 'grade': grade.grade} for grade in grades]
    
    return jsonify({'student_name': student.name, 'grades': grade_data}), 200

# ------------------ Authentication Routes ------------------

# Logout
@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "You have been logged out.", "success": True}), 200

# ------------------ Run the App ------------------

if __name__ == '__main__':
    app.run(port=5555, debug=True)
