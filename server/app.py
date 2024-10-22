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

# Fetch student details
@app.route('/api/student/<int:student_id>', methods=['GET'])
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
    student.guardian_name = data.get('guardian_name', student.guardian_name)
    student.guardian_contact = data.get('guardian_contact', student.guardian_contact)
    student.guardian_email = data.get('guardian_email', student.guardian_email)

    db.session.commit()
    return jsonify({'message': 'Student profile updated successfully.'}), 200

# Upload student image
@app.route('/api/student/<int:student_id>/upload_image', methods=['POST'])
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
