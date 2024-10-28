EduTrack
EduTrack is a school management system designed to streamline the management of students, teachers, classes, subjects, and admin operations. It is built using Flask for the backend and React for the frontend, providing a user-friendly interface to manage all academic activities.

Table of Contents
Features
Technologies
Installation
Usage
API Endpoints
Database Models
Contributing
License
Features
User Authentication: Admin, teachers, and students can log in securely using session-based authentication via Flask-Login.
Role Management: Different roles (Admin, Teacher, Student) with tailored access to resources.
Class Management: Create, update, and manage class assignments for students and teachers.
Subject Management: Add, update, and assign subjects to classes and teachers.
Student and Teacher Management: Track and manage student enrollment and teacher assignments.
Email Notifications: Integrated form submission using EmailJS to receive feedback or queries.
Technologies
Backend
Flask: A lightweight Python framework used for building the backend.
Flask-Login: Session management for user authentication.
SQLAlchemy: ORM used for database models and queries.
Flask-Migrate: Database migration tool.
Frontend
React: JavaScript library for building the user interface.
react-router-dom: For managing frontend routing.
Other Tools
SQLAlchemy Serializer: Automatically serializes SQLAlchemy models into JSON format.
EmailJS: Used to handle form submissions and send emails.
Installation
Prerequisites
Ensure you have the following installed:

Python 3.x
Node.js and npm (for React)
A database system like SQLite or MySQL
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/BarryBaros/EduTrack.git
cd EduTrack
Set up the backend (Flask):

Install dependencies:

bash
Copy code
pip install -r requirements.txt
Set up your environment variables in a .env file:

makefile
Copy code
FLASK_APP=app
FLASK_ENV=development
DATABASE_URI=<your_database_uri>
Initialize the database:

bash
Copy code
flask db init
flask db migrate
flask db upgrade
Run the Flask server:

bash
Copy code
flask run --port=5555
Set up the frontend (React):
Navigate to the client directory:

bash
Copy code
cd client
Install dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm start
Visit the app:

Backend API: http://localhost:5555
Frontend: http://localhost:3000
Usage
Admin Login: Admins can log in and manage students, teachers, classes, and subjects.
Teacher Login: Teachers can view their assigned classes and subjects.
Student Login: Students can view their enrolled subjects and assigned classes.
User Roles
Admin has full control over the entire system.
Teachers can manage classes and subjects assigned to them.
Students can view their courses and performance.
API Endpoints
Method	Endpoint	Description
GET	/api/admins	Fetch all admins
POST	/api/admins	Add a new admin
GET	/api/teachers	Fetch all teachers
POST	/api/teachers	Add a new teacher
GET	/api/students	Fetch all students
POST	/api/students	Add a new student
GET	/api/classes	Fetch all classes
POST	/api/classes	Create a new class
GET	/api/subjects	Fetch all subjects
POST	/api/subjects	Add a new subject
Database Models
Admin: Handles administrative tasks.
Teacher: Manages subject and class assignments.
Student: Tracks enrollment and class performance.
Class: Represents a class with a list of students and assigned teacher(s).
Subject: Contains the list of subjects taught in the school.
Contributing
Fork the repository.
Create a new branch for your feature: git checkout -b feature-name
Make your changes.
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature-name
Submit a pull request.
License
This project is licensed under the MIT License.

