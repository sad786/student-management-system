# student-management-system
An express.js API project created for learning purpose using Typescript and mongodb cloud database 

Deployed Link: https://student-system-fc5e.up.railway.app/

To understand each endpoint please visit Postman documentation by clicking on this link https://www.postman.com/sad786/student-management-system/overview

Postman Documentation: https://www.postman.com/sad786/student-management-system/overview

Welcome to the Student Management System API!
To access this API efficiently follow these instructions

For Admin Login
Endpoint is POST request api/admin/login/

Body : {
  "email": "admin@admin.com",      to login you have to fill admin@admin.com as an email and 'admin' as a password as these are default login details
  "password": "admin"
}
Response: {
  "token": "JWTTOKEN"
}

  Add Student  

  Endpoint : POST /api/admin/students/add
  Purpose : Add a new student to the system.
  Authentication : Requires an admin JWT token in the Authorization header.
  Request Body : {
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Computer Science",
  "password": "password123"
  }
  Response:
  {
  "message": "Student added successfully.",
  "student": {
    "_id": "STUDENT_ID",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Computer Science"
  }
  }

  Assign Task  

    Endpoint : POST /api/admin/tasks/add
    Purpose : Assign a task to a specific student.
    Authentication : Requires an admin JWT token in the Authorization header.
    Request Body : {
  "studentId": "STUDENT_ID",
  "title": "Complete Assignment",
  "description": "Finish chapter 5 homework.",
  "dueDate": "current date"
  }
  Response:
  {
  "message": "Task assigned successfully.",
  "task": {
    "_id": "TASK_ID",
    "studentId": "STUDENT_ID",
    "title": "Complete Assignment",
    "description": "Finish chapter 5 homework.",
    "dueDate": "current date",
    "status": "pending"
    }
  }


  Student Login  

    Endpoint : POST /api/student/login
    Purpose : Authenticate the student and generate a JWT token.
    Request Body :{
  "email": "john.doe@example.com",
  "password": "password123"
  }
  Response: {
  "token": "JWT_TOKEN"
  }

  Get Tasks  

    Endpoint : GET /api/student/tasks
    Purpose : Retrieve all tasks assigned to the logged-in student.
    Authentication : Requires a student JWT token in the Authorization header.
    Response :[
    {
    "_id": "TASK_ID",
    "studentId": "STUDENT_ID",
    "title": "Complete Assignment",
    "description": "Finish chapter 5 homework.",
    "dueDate": "current date",
    "status": "pending"
    }]

  Update Task Status  

    Endpoint : PUT /api/student/tasks/done/:taskId
    Purpose : Update the status of a specific task (e.g., mark as completed).
    Authentication : Requires a student JWT token in the Authorization header.
    Request Body :{
      "status": "completed"
    }
    Reponse:{
      "message": "Task status updated successfully.",
      "task": {
        "_id": "TASK_ID",
        "studentId": "STUDENT_ID",
        "title": "Complete Assignment",
        "description": "Finish chapter 5 homework.",
        "dueDate": "current date",
        "status": "completed"
      }}
