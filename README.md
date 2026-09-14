

A full-stack portfolio built with **React, Node.js and Express**.

This project started as a React portfolio and was extended with a backend API. Project data is now fetched dynamically from the backend, and contact form submissions are validated and stored on the server.

## 🚀 Features

* Responsive React portfolio
* Dark/Light theme
* React Router navigation
* Dynamic project data from REST API
* Project details by ID
* Contact form with server-side validation
* JSON-based data persistence
* Centralized error handling
* CORS configuration
* API testing with automated tests

## 🛠️ Tech Stack

### Frontend

* React 19
* React Router DOM
* Vite
* Vanilla CSS
* Fetch API

### Backend

* Node.js
* Express.js
* CORS
* dotenv

## 💾 Storage

No database is used in this project. Data is stored in JSON files.

```text
server/data/
├── projects.json
└── contacts.json
```

`projects.json` stores portfolio projects, while `contacts.json` stores contact form submissions with an ID and timestamp.

## 📁 Project Structure

```text
PortFolio/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── data/
│   │   ├── projects.json
│   │   └── contacts.json
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── test-api.js
│
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/madaniritish/PortFolio.git
cd PortFolio
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
PROJECTS_FILE=./data/projects.json
CONTACTS_FILE=./data/contacts.json
```

Keep `.env` out of Git.

## ▶️ Running the Project

Run the frontend and backend in **two terminals**.

### Frontend

```bash
npm run dev
```

Runs on:

```text
http://localhost:5173
```

### Backend

```bash
cd server
npm start
```

Runs on:

```text
http://localhost:5000
```

Both servers should be running for the complete application to work.

## 🔌 REST API

| Method | Endpoint            | Purpose                 |
| ------ | ------------------- | ----------------------- |
| GET    | `/`                 | Check server status     |
| GET    | `/api/projects`     | Get all projects        |
| GET    | `/api/projects/:id` | Get a specific project  |
| POST   | `/api/contact`      | Submit contact form     |
| GET    | `/api/contact`      | Get contact submissions |

### Example

```bash
curl http://localhost:5000/api/projects
```

Get a specific project:

```bash
curl http://localhost:5000/api/projects/dqms
```

## 📩 Contact API

Example request:

```bash
curl -X POST http://localhost:5000/api/contact \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john@example.com","message":"Hello"}'
```

The server checks that:

* Name is provided
* Email is provided
* Email format is valid
* Message is provided

Valid requests return `201 Created`; invalid requests return `400 Bad Request`.

## ❌ Error Handling

The backend has centralized error handling.

Unknown routes return:

```json
{
  "error": "Route not found"
}
```

Server errors return:

```json
{
  "error": "Internal server error"
}
```

Malformed JSON is also handled with a `400` response.

## 🌐 CORS

The backend allows requests from the React frontend running on:

```text
http://localhost:5173
```

This allows the frontend and backend to communicate even though they run on different ports.



## 🔒 Security Note

The `GET /api/contact` endpoint is intentionally unauthenticated because it was required for assignment evaluation.

For a production application, this endpoint should be protected using authentication and authorization such as **JWT, API keys or RBAC**.

## 📌 Summary

This project demonstrates how a **React frontend can communicate with a Node.js + Express backend through REST APIs**, with validation, error handling, CORS and simple file-based persistence.
