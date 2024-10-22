from server.app import app, db
from server.models import Admin, Teacher, Student, Subject, Class, Grade  # Assuming these are your models
from werkzeug.security import generate_password_hash
from datetime import datetime

# Create the database and tables (if they don't exist yet)
with app.app_context():
    db.drop_all()  # Optional: Use this carefully to reset the database
    db.create_all()

    # Admin and Teacher data
    admin1 = Admin(staff_id=1001, admin_name="admin1")
    admin1.set_pin_no("1234")  # Set hashed PIN

    teacher1 = Teacher(staff_id=2001, name="Mr. Smith")
    teacher1.set_pin_no("teacherpin")

    # Add Admin and Teacher
    db.session.add_all([admin1, teacher1])

    # Class data
    class1 = Class(class_name="10A", teacher_id=teacher1.id, class_capacity=30)
    db.session.add(class1)

    # Subject data
    math = Subject(name="Mathematics")
    english = Subject(name="English")
    physics = Subject(name="Physics")
    chemistry = Subject(name="Chemistry")
    computer = Subject(name="Computer Science")

    # Add subjects
    db.session.add_all([math, english, physics, chemistry, computer])

    # Student data
    student1 = Student(
        admission_no=5321,
        name="John Doe",
        DOB=datetime(2005, 8, 17),
        class_id=class1.id,
        address="123 Main St, Springfield",
        guardian_name="Jane Doe",
        guardian_contact="555-1234",
        guardian_email="jane.doe@example.com"
    )
    student1.set_pin_no("studentpin")

    # Add student
    db.session.add(student1)

    # Grade data for the student
    grades = [
        Grade(student_id=student1.id, subject_id=math.id, grade="A"),
        Grade(student_id=student1.id, subject_id=english.id, grade="B+"),
        Grade(student_id=student1.id, subject_id=physics.id, grade="A-"),
        Grade(student_id=student1.id, subject_id=chemistry.id, grade="B"),
        Grade(student_id=student1.id, subject_id=computer.id, grade="B")
    ]

    # Add grades
    db.session.add_all(grades)

    # Commit the changes
    try:
        db.session.commit()
        print("Database seeded successfully!")
    except Exception as e:
        db.session.rollback()  # Rollback in case of any error
        print(f"Error seeding database: {e}")
