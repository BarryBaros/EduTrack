from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

# Admin Model
class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, nullable=False, unique=True)
    admin_name = db.Column(db.String(50), nullable=False)
    pin_no = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'staff_id': self.staff_id,
            'admin_name': self.admin_name,
            'pin_no': self.pin_no
        }

# Teacher Model
class Teacher(db.Model, SerializerMixin):
    __tablename__ = 'teachers'

    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, nullable=False, unique=True)
    pin_no = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'staff_id': self.staff_id,
            'pin_no': self.pin_no,
            'name': self.name
        }

# Class Model
class Class(db.Model, SerializerMixin):
    __tablename__ = 'classes'

    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.String(50), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    class_capacity = db.Column(db.Integer, nullable=False)

    # Relationship to Teacher
    teacher = db.relationship('Teacher', backref='classes', lazy=True)

    # Relationship to Students
    students = db.relationship('Student', backref='classroom', lazy=True)

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
    pin_no = db.Column(db.Integer, nullable=False)
    DOB = db.Column(db.Date, nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    general_grade = db.Column(db.String(10), nullable=True)
    address = db.Column(db.String(100), nullable=True)
    guardian_name = db.Column(db.String(50), nullable=False)
    guardian_contact = db.Column(db.String(20), nullable=False)
    guardian_email = db.Column(db.String(50), nullable=False)

    # Relationship to Class
    class_ = db.relationship('Class', backref='students', lazy=True)

    # Many-to-many relationship to Subjects via StudentSubject
    student_subjects = db.relationship('StudentSubject', back_populates='student', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'admission_no': self.admission_no,
            'name': self.name,
            'pin_no': self.pin_no,
            'DOB': self.DOB.strftime('%Y-%m-%d'),
            'class_id': self.class_id,
            'general_grade': self.general_grade,
            'address': self.address,
            'guardian_name': self.guardian_name,
            'guardian_contact': self.guardian_contact,
            'guardian_email': self.guardian_email
        }

    @validates('admission_no')
    def validate_admission_no(self, key, admission_no):
        if admission_no <= 0:
            raise ValueError("Admission number must be positive.")
        return admission_no

# Subject Model
class Subject(db.Model, SerializerMixin):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    # Many-to-many relationship to Students via StudentSubject
    student_subjects = db.relationship('StudentSubject', back_populates='subject', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

# Student-Subject Association Table
class StudentSubject(db.Model, SerializerMixin):
    __tablename__ = 'student_subject'

    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), primary_key=True)
    grade = db.Column(db.String(10))

    # Relationships
    student = db.relationship("Student", back_populates="student_subjects")
    subject = db.relationship("Subject", back_populates="student_subjects")

# Attendance Model
class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendance'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(10), nullable=False)  # 'present' or 'absent'

    # Relationship to Student
    student = db.relationship("Student", backref="attendance_records", lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'date': self.date.strftime('%Y-%m-%d'),
            'status': self.status
        }
