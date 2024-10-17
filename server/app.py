from flask import Flask, make_response, jsonify, request, redirect, url_for, render_template, flash, session
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Admin, Teacher, Student, Subject, Class
from datetime import datetime
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from dotenv import load_dotenv
import os

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
     # Load user based on their type (Admin, Teacher, or Student)
    user = Admin.query.get(int(user_id)) or Teacher.query.get(int(user_id)) or Student.query.get(int(user_id))
    return user
    # # Load user from the database
    # return Admin.query.get(int(user_id))  # Adjust this based on the model you want to load


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)

migrate = Migrate(app, db)
db.init_app(app)

@app.route('/')
def index():
    return 'Hi, welcome to the EduTrack!'

# Get all teachers
@app.route('/teachers', methods=['GET'])
def get_teachers():
    teachers = Teacher.query.all()
    return jsonify([teacher.name for teacher in teachers])

# Create a new teacher
@app.route('/teachers', methods=['POST'])
def create_teacher():
    data = request.get_json()
    new_teacher = Teacher(
        staff_id=data['staff_id'],
        pin_no=data['pin_no'],
        name=data['name']
    )
    db.session.add(new_teacher)
    db.session.commit()
    return jsonify({'message': 'Teacher created successfully'}), 201

# Get all students
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([student.name for student in students])

# Get all admins
@app.route('/admins', methods=['GET'])
def get_admins():
    admins = Admin.query.all()
    return jsonify([{'staff_id': admin.staff_id, 'admin_name': admin.admin_name} for admin in admins])

# Get a single student by ID
@app.route('/students/<int:id>', methods=['GET'])
def get_student(id):
    student = Student.query.get_or_404(id)
    return jsonify({
        'name': student.name,
        'admission_no': student.admission_no,
        'DOB': student.DOB.strftime('%Y-%m-%d'),
        'class_id': student.class_id
    })

# Create a new student
@app.route('/students', methods=['POST'])
def create_student():
    data = request.get_json()
    new_student = Student(
        admission_no=data['admission_no'],
        name=data['name'],
        pin_no=data['pin_no'],
        DOB=datetime.strptime(data['DOB'], '%Y-%m-%d'),
        class_id=data['class_id'],
        general_grade=data.get('general_grade', ''),
        address=data.get('address', ''),
        guardian_name=data.get('guardian_name', ''),
        guardian_contact=data.get('guardian_contact', ''),
        guardian_email=data.get('guardian_email', '')
    )
    db.session.add(new_student)
    db.session.commit()
    return jsonify({'message': 'Student created successfully'}), 201

# Update student
@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    student = Student.query.get_or_404(id)
    data = request.get_json()
    student.name = data['name']
    student.pin_no = data['pin_no']
    student.DOB = datetime.strptime(data['DOB'], '%Y-%m-%d')
    student.class_id = data['class_id']
    db.session.commit()
    return jsonify({'message': 'Student updated successfully'})

# Delete student
@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.get_or_404(id)
    db.session.delete(student)
    db.session.commit()
    return jsonify({'message': 'Student deleted successfully'})

# Get all subjects
@app.route('/subjects', methods=['GET'])
def get_subjects():
    subjects = Subject.query.all()
    return jsonify([subject.name for subject in subjects])

# Create a new subject
@app.route('/subjects', methods=['POST'])
def create_subject():
    data = request.get_json()
    new_subject = Subject(name=data['name'])
    db.session.add(new_subject)
    db.session.commit()
    return jsonify({'message': 'Subject created successfully'}), 201

# Get all classes
@app.route('/classes', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    return jsonify([cls.class_name for cls in classes])

# Create a new class
@app.route('/classes', methods=['POST'])
def create_class():
    data = request.get_json()
    new_class = Class(
        class_name=data['class_name'],
        teacher_id=data['teacher_id'],
        class_capacity=data['class_capacity']
    )
    db.session.add(new_class)
    db.session.commit()
    return jsonify({'message': 'Class created successfully'}), 201

# Admin Login Route
@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        staff_id = request.form['staff_id']
        pin_no = request.form['pin_no']

        # Query the Admin table to authenticate
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
def admin_dashboard():
    return f'Welcome to the admin dashboard, {current_user.staff_id}!'

# Admin Logout Route
@app.route('/admin_logout')
@login_required
def admin_logout():
    logout_user()  # Logs the admin out and clears the session
    flash('You have been logged out.')
    return redirect(url_for('admin_login'))

# Teacher Login Route
@app.route('/teacher_login', methods=['POST'])
def teacher_login():
    data = request.json  # Expecting JSON data
    staff_id = data.get('staff_id')
    pin_no = data.get('pin_no')

    # Query the Teacher table to authenticate
    teacher = Teacher.query.filter_by(staff_id=staff_id).first()

    if teacher and teacher.pin_no == pin_no:  # Check the PIN without hashing
        login_user(teacher)  # Log the teacher in and create a session
        return jsonify({"message": f"Welcome {teacher.staff_id}!", "success": True}), 200
    else:
        return jsonify({"message": "Invalid staff ID or PIN number. Please try again.", "success": False}), 401

# Student Login Route
@app.route('/student_login', methods=['POST'])
def student_login():
    data = request.json  # Expecting JSON data
    admission_no = data.get('admission_no')
    pin_no = data.get('pin_no')

    # Query the Student table to authenticate
    student = Student.query.filter_by(admission_no=admission_no).first()

    if student and student.pin_no == pin_no:  # Check the PIN without hashing
        login_user(student)  # Log the student in and create a session
        return jsonify({"message": f"Welcome {student.name}!", "success": True}), 200
    else:
        return jsonify({"message": "Invalid admission number or PIN number. Please try again.", "success": False}), 401

# Logout Route (for Teachers and Students)
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()  # Logs the user out and clears the session
    return jsonify({"message": "You have been logged out.", "success": True}), 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)
