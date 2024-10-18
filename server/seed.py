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
    student1 = Student(admission_no=5321,name="Mathew Ndirangu", pin_no_hash=2024, DOB=17/8/2017, class_id=1,address="Nairobi", guardian_name="David",guardian_contact="074538319",guardian_email="David@gmail.com" )
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
