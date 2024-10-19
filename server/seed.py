from datetime import datetime
import requests
from server.app import db, app
from server.models import Admin, Teacher, Student, Subject, Class

# Base URL for Flask application
BASE_URL = 'http://localhost:5555/save'

# Function to save model data
def save_model(model_type, data):
    response = requests.post(f'{BASE_URL}/{model_type}', json=data)
    if response.status_code == 201:
        print(f'{model_type.capitalize()} saved successfully: {data}')
    else:
        print(f'Error saving {model_type}: {response.json()}')

# Create the database and the tables (if they don't exist yet)
with app.app_context():
    # Clear existing data
    db.drop_all()
    db.create_all()

    # Seed Admins
    save_model('admin', {'staff_id': 1001, 'admin_name': "admin1", 'pin_no': 1234})
    save_model('admin', {'staff_id': 1002, 'admin_name': "admin2", 'pin_no': 5678})

    # Seed Teachers
    save_model('teacher', {'staff_id': 200, 'name': "Michael Juma", 'pin_no': 1100})
    save_model('teacher', {'staff_id': 201, 'name': "Jane Smith", 'pin_no': 1200})
    save_model('teacher', {'staff_id': 202, 'name': "Tom Johnson", 'pin_no': 1300})

    # Seed Classes
    class_data = [
        {'class_name': "Maths", 'teacher_id': 200, 'class_capacity': 30},
        {'class_name': "English", 'teacher_id': 201, 'class_capacity': 25},
        {'class_name': "Kiswahili", 'teacher_id': 202, 'class_capacity': 25},
        {'class_name': "Biology", 'teacher_id': 200, 'class_capacity': 20},
        {'class_name': "Chemistry", 'teacher_id': 201, 'class_capacity': 30},
        {'class_name': "Physics", 'teacher_id': 202, 'class_capacity': 25},
        {'class_name': "History", 'teacher_id': 200, 'class_capacity': 30}
    ]
    
    for class_info in class_data:
        save_model('class', class_info)

    # Seed Students
    student1_data = {
        'admission_no': 10001,
        'name': "Sarah James",
        'pin_no': 1111,
        'DOB': datetime.strptime('2005-05-10', '%Y-%m-%d').date(),
        'class_id': 1,  # Assuming class1 has id 1, you might need to adjust this
        'general_grade': 'A',
        'address': '123 Main St',
        'guardian_name': 'John James',
        'guardian_contact': '555-1234',
        'guardian_email': 'john.james@example.com'
    }

    student2_data = {
        'admission_no': 10002,
        'name': "Brian Joshua",
        'pin_no': 1112,
        'DOB': datetime.strptime('2005-07-21', '%Y-%m-%d').date(),
        'class_id': 1,  # Assuming class1 has id 1, you might need to adjust this
        'general_grade': 'B+',
        'address': '321 Main St',
        'guardian_name': 'Mary Joyce',
        'guardian_contact': '223-1234',
        'guardian_email': 'mary.joyce@example.com'
    }

    save_model('student', student1_data)
    save_model('student', student2_data)

    print("Database seeded successfully!")
