from flask import Flask, jsonify, request, redirect, url_for, render_template, flash, session
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Admin, Teacher, Student, Subject, Class, Grade
from datetime import datetime
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from dotenv import load_dotenv
import os
from werkzeug.utils import secure_filename

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Load the secret key from the environment variable
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# User loader function for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))  # Adjust this based on the model you want to load

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Config for image uploads
app.config['UPLOAD_FOLDER'] = 'uploads/'  # Ensure this folder exists
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit upload size to 16MB

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)

@app.route('/')
def index():
    return 'Hi, welcome to EduTrack!'

# ------------------ Student Management ------------------

@app.route('/student/<int:student_id>', methods=['GET'])
@login_required
def get_student(student_id):
    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found'}), 404

    student_data = {
        'id': student.id,
        'admission_no': student.admission_no,
        'name': student.name,
        'class_name': student.class_.class_name,
        'grades': [{'subject': grade.subject.name, 'grade': grade.grade} for grade in student.grades],
        'attendance': student.attendance,
        'guardian_name': student.guardian_name,
        'guardian_contact': student.guardian_contact,
        'guardian_email': student.guardian_email,
        'image': student.image or '/path/to/default-image.jpg'  # Default image if not set
    }
    return jsonify(student_data)

# Update Student Profile
@app.route('/student/<int:student_id>', methods=['PUT'])
@login_required
def update_student(student_id):
    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found'}), 404

    # Ensure the user is authorized to edit the profile
    if current_user.id != student.id and not isinstance(current_user, Teacher):
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.get_json()
    
    # Update student details
    student.guardian_name = data.get('guardian_name', student.guardian_name)
    student.guardian_contact = data.get('guardian_contact', student.guardian_contact)
    student.guardian_email = data.get('guardian_email', student.guardian_email)

    # Save the updated student object
    db.session.commit()
    return jsonify({'message': 'Student profile updated successfully.'}), 200

# Upload Student Image
@app.route('/student/<int:student_id>/upload_image', methods=['POST'])
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

    # Save the image file
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    student.image = file_path  # Assuming this is where you store the image path in your model
    db.session.commit()

    return jsonify({'message': 'Image uploaded successfully!', 'image_path': student.image}), 201

# Fetch a student's grades (for students or teachers)
@app.route('/students/<int:student_id>/grades', methods=['GET'])
@login_required
def get_grades(student_id):
    student = Student.query.get_or_404(student_id)

    # Check if current_user is either the student or a teacher
    if current_user.id != student.id and not isinstance(current_user, Teacher):
        return jsonify({'error': 'Unauthorized access'}), 403

    grades = Grade.query.filter_by(student_id=student.id).all()
    grade_data = {grade.subject.name: grade.grade for grade in grades}

    return jsonify({'student_name': student.name, 'grades': grade_data}), 200

# ------------------ Grade Management ------------------

# Teacher inputting grades for a student
@app.route('/students/<int:student_id>/grades', methods=['POST'])
@login_required
def input_grades(student_id):
    if not isinstance(current_user, Teacher):
        return jsonify({'error': 'Unauthorized access'}), 403

    student = Student.query.get_or_404(student_id)
    data = request.get_json()

    for subject_name, grade_value in data.items():
        subject = Subject.query.filter_by(name=subject_name).first()
        if subject:
            new_grade = Grade(
                student_id=student.id,
                subject_id=subject.id,
                grade=grade_value
            )
            db.session.add(new_grade)
        else:
            return jsonify({'error': f'Subject {subject_name} not found'}), 404

    db.session.commit()
    return jsonify({'message': 'Grades recorded successfully'}), 201

# ------------------ User Management ------------------

# Teacher Login Route
@app.route('/teacher_login', methods=['POST'])
def teacher_login():
    data = request.json
    staff_id = data.get('staff_id')
    pin_no = data.get('pin_no')

    teacher = Teacher.query.filter_by(staff_id=staff_id).first()

    if teacher and teacher.pin_no == pin_no:
        login_user(teacher)
        return jsonify({"message": f"Welcome {teacher.name}!", "success": True}), 200
    else:
        return jsonify({"message": "Invalid credentials", "success": False}), 401

# Student Login Route
@app.route('/student_login', methods=['POST'])
def student_login():
    data = request.json
    admission_no = data.get('admission_no')
    pin_no = data.get('pin_no')

    student = Student.query.filter_by(admission_no=admission_no).first()

    if student and student.pin_no == pin_no:
        login_user(student)
        return jsonify({"message": f"Welcome {student.name}!", "success": True}), 200
    else:
        return jsonify({"message": "Invalid credentials", "success": False}), 401

# Admin Login Route
@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        staff_id = request.form['staff_id']
        pin_no = request.form['pin_no']

        admin = Admin.query.filter_by(staff_id=staff_id).first()

        if admin and admin.pin_no == pin_no:
            login_user(admin)
            flash(f'Welcome {admin.staff_id}! You are logged in.')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid staff ID or PIN number. Please try again.')

    return render_template('admin_login.html')

# ------------------ Admin Dashboard ------------------
@app.route('/admin_dashboard')
@login_required
def admin_dashboard():
    return f'Welcome to the admin dashboard, {current_user.staff_id}!'

# Admin Logout Route
@app.route('/admin_logout')
@login_required
def admin_logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('admin_login'))

# ------------------ Logout for Teachers/Students ------------------
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "You have been logged out.", "success": True}), 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)
