from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, Admin, Teacher, Student, Subject, Class, StudentSubject
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

bcrypt = Bcrypt(app)
CORS(app)

migrate = Migrate(app, db)
db.init_app(app)

# Get all teachers
@app.route('/teachers', methods=['GET'])
def get_teachers():
    teachers = Teacher.query.all()
    return jsonify([teacher.name for teacher in teachers])

# Create a new teacher@app.route('/teachers', methods=['POST'])
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
    return jsonify({'message': 'Student deleted successfully'})

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


if __name__ == '__main__':
    app.run(port=5555, debug=True)