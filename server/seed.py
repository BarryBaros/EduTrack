from datetime import datetime
import requests
from server.app import create_app, db  # Make sure app is initialized via create_app

# Base URL for Flask application
BASE_URL = 'http://localhost:5555/save'

# Function to save model data
def save_model(model_type, data):
    response = requests.post(f'{BASE_URL}/{model_type}', json=data)
    if response.status_code == 201:
        print(f'{model_type.capitalize()} saved successfully: {data}')
        return response.json().get('id')  # Return the ID from the response
    else:
        print(f'Error saving {model_type}: {response.json()}')
        return None

# Initialize the app and database
app = create_app()  # Ensure the app is correctly created

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
    class_ids = {}
    class_data = [
        {'class_name': "Form 1", 'teacher_id': 200, 'class_capacity': 30},
        {'class_name': "Form 2", 'teacher_id': 201, 'class_capacity': 25},
        {'class_name': "Form 3", 'teacher_id': 202, 'class_capacity': 20},
        {'class_name': "Form 4", 'teacher_id': 200, 'class_capacity': 30},
    ]
    
    for class_info in class_data:
        class_id = save_model('class', class_info)
        if class_id:
            class_ids[class_info['class_name']] = class_id

    # Print IDs to check
    maths_id = class_ids.get('Form 1')
    english_id = class_ids.get('Form 2')
    print(f'Form 1 ID: {maths_id}, Form 2 ID: {english_id}')
    
    # Seed Students
    student1_data = {
        'admission_no': 10001,
        'name': "Sarah James",
        'pin_no': 1111,
        'DOB': datetime(2004, 7, 12).strftime('%Y-%m-%d'),
        'class_id': class_ids['Form 1'],
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
        'DOB': datetime(2005, 5, 15).strftime('%Y-%m-%d'),
        'class_id': class_ids['Form 2'], 
        'general_grade': 'B+',
        'address': '321 Main St',
        'guardian_name': 'Mary Joyce',
        'guardian_contact': '223-1234',
        'guardian_email': 'mary.joyce@example.com'
    }

    save_model('student', student1_data)
    save_model('student', student2_data)

    print("Database seeded successfully!")
