# Collaborative Task Management Application

## Overview
This project is a collaborative task management application designed to help users organize their tasks and projects effectively. The application will feature user authentication, project management, task assignment, and real-time notifications.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: Handlebars
- **Authentication**: JSON Web Tokens (JWT)
- **Real-time Communication**: Socket.io (for notifications)
- **Testing**: Postman

## Features
- User registration and login with JWT authentication.
- Create, read, update, and delete (CRUD) operations for tasks and projects.
- Assign tasks to users and track their progress.
- Real-time notifications when tasks are updated or assigned.
- Frontend interface using Handlebars for dynamic rendering.

## 📄 Endpoints Overview

### 🌐 Frontend Endpoints (Handlebars)
1. **GET `/`**: Home
2. **GET `/register`**: User Registration Page
3. **GET `/login`**: User Login Page
4. **GET `/profile`**: User Profile Page

### Sessions
- **POST `/api/sessions/login`**:  Log in the user (requirements: email and password)
- **POST `/api/sessions/register`**: Register a new user (requirements: first name, last name, email, and password)
- **GET `/api/sessions/failureLogin`**: Returns if login fails
- **GET `/api/sessions/failureRegister`**: Returns if registration fails
- **GET `/api/sessions/logout`**: Logout the user
- **GET `/api/sessions/current`**: Verify the JWT token
- **GET `/api/sessions/githubcallback`**: Callback for GitHub login
- **GET `/api/sessions/github`**: Initiate GitHub login

### 🧑‍💼 Users
- **GET `/api/users/`**: Fetch all users

### 📁 Projects
- **GET `/api/projects/`**: Fetch all projects
- **GET `/api/projects/:pid`**: Fetch project by ID specified in `:pid`
- **GET `/api/projects/:pid/tasks`**: Fetch tasks of the project specified in `:pid`
- **POST `/api/projects/newProject`**: Create a new project (requirements: name, description, due date)
- **POST `/api/projects/:pid/tasks`**: Create tasks for the project specified in `:pid` (requirements: title, description, status: ['Unassigned', 'Assigned', 'In process', 'Late', 'Delivered', 'Returned'], deadline, assignedTo (not required when status is "Unassigned"))

### ✅ Tasks
- **GET `/api/tasks`**: Fetch all tasks



