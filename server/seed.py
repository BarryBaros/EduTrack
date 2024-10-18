from datetime import datetime
from app import db, app
from models import Admin, Teacher, Student, Subject, Class

# Create the database and the tables (if they don't exist yet)
with app.app_context():
    # Clear existing data
    db.drop_all()
    db.create_all()

    # Seed Admins
    admin1 = Admin(staff_id=1001, admin_name="admin1", pin_no=1234)
    admin2 = Admin(staff_id=1002, admin_name="admin2", pin_no=5678)

    teacher1 = Teacher(staff_id=200, name="Michael Juma", pin_no=1100)

    class1 = Class()

    student1 = Student(
    admission_no=10001, 
    name="Sarah James", 
    pin_no=1111, 
    DOB=datetime.strptime('2005-05-10', '%Y-%m-%d').date(),  
    general_grade='A', 
    address='123 Main St', 
    guardian_name='John James', 
    guardian_contact='555-1234', 
    guardian_email='john.james@example.com'
    )


    # Add all instances to the session
    db.session.add(admin1)
    db.session.add(admin2)
    db.session.add(teacher1)

    # Commit the changes
    try:
        db.session.commit()
        print("Database seeded successfully!")
    except Exception as e:
        db.session.rollback()  # Rollback in case of any error
        print(f"Error seeding database: {e}")
