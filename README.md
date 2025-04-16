Full-Stack To-Do List Application

This project is a complete full-stack To-Do List application that combines a React frontend with a FastAPI backend. The backend exposes a RESTful API and uses SQLite for data storage, while the frontend provides functionality for users to add, edit, delete, and filter tasks.

Setup Instructions

Prerequisites

Ensure the following are installed on your machine:

•	Node.js and npm (for the React frontend)

•	Python (for the FastAPI backend)

•	SQLite (if not using the default setup)

Frontend (React)

1.	Clone the repository to your local machine:

git clone repository-url

cd repository-folder


2.	Install the necessary dependencies for the frontend:
npm install  

3.	Start the development server to view the frontend:
npm run dev  

The frontend will now be available at http://localhost:3000.

Backend (FastAPI)

1.	Go to the backend directory:
cd fastapi-backend  

2.	Create and activate a virtual environment for Python:
python -m venv venv  
source venv/bin/activate  

# On Windows, use: 
venv\Scripts\activate  

3.	Install the required backend dependencies:
pip install -r requirements.txt  


4.	Run the FastAPI development server to start the backend:
uvicorn app.main:app --reload  


The backend will be available at http://localhost:8000.

Backend API Endpoints:

GET https://mariabackendfastapi.onrender.com/mariatodo/
Description: Fetch all to-do items.

POST https://mariabackendfastapi.onrender.com/mariatodo/ Description: Create a new to-do item.

GET https://mariabackendfastapi.onrender.com/mariatodo/todo_id} Description: Fetch a single to-do item by ID.

PUT https://mariabackendfastapi.onrender.com/mariatodo/{todo_id} Description: Update a to-do item by ID.

DELETE https://mariabackendfastapi.onrender.com/mariatodo/{todo_id} Description: Delete a to-do item by ID.

GET https://mariabackendfastapi.onrender.com/mariatodo/{status} Description: Fetch to-do items filtered by status (completed or pending).


