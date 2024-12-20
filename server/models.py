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
    
    def save(self):
        db.session.add(self)
        db.session.commit()


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

    def save(self):
        db.session.add(self)
        db.session.commit()


# Class Model
class Class(db.Model, SerializerMixin):
    __tablename__ = 'classes'

    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.String(50), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    class_capacity = db.Column(db.Integer, nullable=False)

    # Relationship to Teacher
    teacher = db.relationship('Teacher', backref='classes', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'class_name': self.class_name,
            'teacher_id': self.teacher_id,
            'class_capacity': self.class_capacity
        }

    def save(self):
        db.session.add(self)
        db.session.commit()


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

    def save(self):
        db.session.add(self)
        db.session.commit()


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

    def save(self):
        db.session.add(self)
        db.session.commit()


# Student-Subject Association Table
class StudentSubject(db.Model, SerializerMixin):
    __tablename__ = 'student_subject'

    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), primary_key=True)
    grade = db.Column(db.String(10))

    # Relationships
    student = db.relationship("Student", back_populates="student_subjects")
    subject = db.relationship("Subject", back_populates="student_subjects")

    def save(self):
        db.session.add(self)
        db.session.commit()


# Marks Model
class Marks(db.Model, SerializerMixin):
    __tablename__ = 'marks'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)
    score = db.Column(db.Float, nullable=False)
    term = db.Column(db.String(20), nullable=False)  # e.g., "Term 1", "Term 2", etc.

    # Relationships
    student = db.relationship('Student', backref='marks', lazy=True)
    subject = db.relationship('Subject', backref='marks', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'subject_id': self.subject_id,
            'score': self.score,
            'term': self.term
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

# Remarks Model
class Remarks(db.Model, SerializerMixin):
    __tablename__ = 'remarks'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Relationship
    student = db.relationship('Student', backref='remarks', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'comment': self.comment,
            'date': self.date.strftime('%Y-%m-%d %H:%M:%S')
        }

    def save(self):
        db.session.add(self)
        db.session.commit()
