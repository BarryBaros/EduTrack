from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import MetaData

# MetaData for consistency in db schema
metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

# Admin Model
class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, nullable=False, unique=True)
    admin_name = db.Column(db.String(50), nullable=False)
    pin_no_hash = db.Column(db.String(128), nullable=False)

    def set_pin_no(self, pin_no):
        self.pin_no_hash = generate_password_hash(pin_no)

    def check_pin_no(self, pin_no):
        return check_password_hash(self.pin_no_hash, pin_no)

    def to_dict(self):
        return {
            'id': self.id,
            'staff_id': self.staff_id,
            'admin_name': self.admin_name
        }

# Teacher Model
class Teacher(db.Model, SerializerMixin):
    __tablename__ = 'teachers'

    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, nullable=False, unique=True)
    pin_no_hash = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    def set_pin_no(self, pin_no):
        self.pin_no_hash = generate_password_hash(pin_no)

    def check_pin_no(self, pin_no):
        return check_password_hash(self.pin_no_hash, pin_no)

    def to_dict(self):
        return {
            'id': self.id,
            'staff_id': self.staff_id,
            'name': self.name
        }

# Class Model
class Class(db.Model, SerializerMixin):
    __tablename__ = 'classes'

    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.String(50), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    class_capacity = db.Column(db.Integer, nullable=False)

    teacher = db.relationship('Teacher', backref='classes', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'class_name': self.class_name,
            'teacher_id': self.teacher_id,
            'class_capacity': self.class_capacity
        }

# Student Model
class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    admission_no = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(50), nullable=False)
    pin_no_hash = db.Column(db.String(128), nullable=False)
    DOB = db.Column(db.Date, nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    general_grade = db.Column(db.String(10), nullable=True)
    address = db.Column(db.String(100), nullable=True)
    guardian_name = db.Column(db.String(50), nullable=False)
    guardian_contact = db.Column(db.String(20), nullable=False)
    guardian_email = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(255))

    class_ = db.relationship('Class', backref='students', lazy=True)
    grades = db.relationship('Grade', backref='student', lazy=True)

    def set_pin_no(self, pin_no):
        self.pin_no_hash = generate_password_hash(pin_no)

    def check_pin_no(self, pin_no):
        return check_password_hash(self.pin_no_hash, pin_no)

    def to_dict(self):
        return {
            'id': self.id,
            'admission_no': self.admission_no,
            'name': self.name,
            'DOB': self.DOB.strftime('%Y-%m-%d'),
            'class_id': self.class_id,
            'general_grade': self.general_grade,
            'address': self.address,
            'guardian_name': self.guardian_name,
            'guardian_contact': self.guardian_contact,
            'guardian_email': self.guardian_email
        }

# Subject Model
class Subject(db.Model, SerializerMixin):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    grades = db.relationship('Grade', backref='subject', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

# Grade Model (for individual grades per student per subject)
class Grade(db.Model, SerializerMixin):
    __tablename__ = 'grades'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)
    grade = db.Column(db.String(2))

    def to_dict(self):
        return {
            'student_id': self.student_id,
            'subject_id': self.subject_id,
            'grade': self.grade
        }
