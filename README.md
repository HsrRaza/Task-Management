# 📝 Task Management API

Welcome to the **Task Management API**! This project is a RESTful API built with Node.js and Express, designed to manage projects, tasks, and notes efficiently.

---

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 🧑‍🤝‍🧑 Project Membership System
- 📁 Project CRUD
- 🗒️ Task Creation & Management
- 🧷 Note Management per Task
- 🔄 Role-Based Access Control (Admin, Project Admin, Member)

---

## 🗂️ Project Structure

├── controllers/
│ ├── auth.controller.js
│ ├── project.controller.js
│ ├── task.controller.js
│ ├── note.controller.js
│ └── member.controller.js
├── models/
├── routes/
├── middlewares/
├── utils/
└── server.js



---

## 📦 API Modules

### 🔐 Auth

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth//verify/:verifyToken` - Verify Email user
- `POST /api/auth/logout` - Logout user

### 📁 Project

- `POST /api/create-project` - Create a project
- `GET /api/projects/:projectId` - Get project details
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project
- `GET /api/projects/get-member/:projectId"` - Get project members

### ✅ Task

- `POST /api/task/` - Create task
- `GET /api/task/:taskId` - Get task by ID
- `PUT /api/task/:taskId` - Update task
- `DELETE /api/task/:taskId` - Delete task


### 📝 Note

- `POST /api/notes` - Add note to task
- `GET /api/notes/:taskId` - Get notes for a task
- `DELETE /api/notes/:id` - Delete a note

### 👥 Member

- `POST /api/projects/:projectId/members` - Add member to project
- `PUT /api/projects/:projectId/members/:memberId` - Update member role
- `DELETE /api/projects/:projectId/members/:memberId` - Remove member

---

## 🛡️ Roles & Permissions

| Role          | Create | Update | Delete | View |
|---------------|--------|--------|--------|------|
| Admin         | ✅     | ✅     | ✅     | ✅   |
| Project Admin | ✅     | ✅     | 🚫     | ✅   |
| Member        | 🚫     | 🚫     | 🚫     | ✅   |

---

## 🧪 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- dotenv for config
- Custom Error Handling (ApiError / ApiResponse)

---

## 🛠️ Setup & Installation

```bash
git clone https://github.com/your-username/task-management-api.git
cd task-management-api
npm install
cp .env.example .env
# Update your env variables
npm run dev
