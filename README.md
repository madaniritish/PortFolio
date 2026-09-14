# Madani Ritish - React & Express Portfolio

A full-stack web portfolio built by extending an existing React portfolio (Assignment 2) with a dedicated Node.js and Express RESTful API backend (Assignment 3). The application features dynamic project data fetching, asynchronous contact submissions, centralized error handling, and file-based JSON persistence.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Storage Architecture](#storage-architecture)
- [Project Directory Structure](#project-directory-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [REST API Documentation](#rest-api-documentation)
  - [1. Health Check (`GET /`)](#1-health-check-get-)
  - [2. Get All Projects (`GET /api/projects`)](#2-get-all-projects-get-apiprojects)
  - [3. Get Project by ID (`GET /api/projects/:id`)](#3-get-project-by-id-get-apiprojectsid)
  - [4. Submit Contact Message (`POST /api/contact`)](#4-submit-contact-message-post-apicontact)
  - [5. Get Contact Submissions (`GET /api/contact`)](#5-get-contact-submissions-get-apicontact)
  - [6. Catch-All 404 Handler](#6-catch-all-404-handler)
  - [7. Centralized Error Handling & CORS](#7-centralized-error-handling--cors)
- [Security Disclaimer](#security-disclaimer)
- [cURL & Automated Testing](#curl--automated-testing)

---

## Project Overview

This project is an evolution of the Assignment 2 single-page React portfolio. The frontend preserves all original design elements—including the responsive navigation bar, light/dark theme toggle, React Router DOM v7 routing (`/Home`, `/about`, `/projects`, `/projects/:projectId`, `/contact`, and `*`), project card details modal/expansion, and 404 error page.

In Assignment 3, static client-side project data imports have been replaced with dynamic backend API integration powered by a Node.js + Express server. The React frontend consumes these endpoints using plain `fetch()` within React hooks (`useEffect` and `useState`), providing dedicated loading indicators and fault-tolerant error boundaries.

---

## Technologies Used

### Frontend
- **React 19**: Modern component architecture and reactive state management.
- **React Router DOM v7**: Client-side declarative routing and URL parameter extraction (`useParams`).
- **Vanilla CSS**: Responsive design system, CSS custom properties, and dark mode theming without third-party CSS frameworks.
- **Vite**: Ultra-fast build tool and local development server.
- **Plain `fetch` API**: Lightweight, dependency-free HTTP communication with the backend.

### Backend
- **Node.js**: Asynchronous event-driven JavaScript runtime environment.
- **Express**: Minimal and flexible Node.js web application framework.
- **cors**: Cross-Origin Resource Sharing middleware enabling secure frontend-backend communication.
- **dotenv**: Zero-dependency module for loading environment variables from `.env`.

---

## Storage Architecture

**Contact submissions are persisted using a JSON file. No database or ORM is used.**

- **Projects Data (`server/data/projects.json`)**: Stores all project records with fields (`id`, `title`, `description`, `techStack`, `image`, `link`, `highlights`).
- **Contacts Data (`server/data/contacts.json`)**: Persists incoming contact form submissions with generated unique identifiers (`id`), sender details (`name`, `email`, `message`), and ISO timestamps (`createdAt`).

---

## Project Directory Structure

```text
PortFolio/
│
├── public/                 # Static assets and icons
├── src/                    # Frontend React source code
│   ├── assets/             # Images and visual media
│   ├── components/         # Reusable React components (Navbar, Footer, ProjectCard, etc.)
│   ├── pages/              # Application pages (Home, About, Projects, ProjectDetails, Contact, NotFound)
│   ├── App.css             # Root application styles
│   ├── App.jsx             # Top-level routing and theme provider
│   ├── index.css           # Global design system, theme definitions, and animations
│   └── main.jsx            # React application entry point
│
├── server/                 # Dedicated Node.js + Express backend
│   ├── data/               # File-based JSON persistence
│   │   ├── contacts.json   # Stored contact submissions
│   │   └── projects.json   # Project records dataset
│   ├── .env                # Local environment variables (git-ignored)
│   ├── .env.example        # Sample environment configuration template
│   ├── curl-tests.md       # Complete cURL test documentation
│   ├── package.json        # Backend dependencies and scripts
│   ├── server.js           # Express API server implementation
│   └── test-api.js         # Automated end-to-end API test suite
│
├── .gitignore              # Git ignore rules (includes .env and node_modules)
├── eslint.config.js        # ESLint flat configuration
├── index.html              # HTML entry template
├── package.json            # Frontend package metadata and dependencies
├── README.md               # Comprehensive documentation
└── vite.config.js          # Vite configuration
```

---

## Installation & Setup

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm (version 9+ or 10+ recommended)
- Git

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/madaniritish/PortFolio.git
   cd PortFolio
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

---

## Environment Configuration

The backend relies on environment variables configured in `server/.env`. A template file `server/.env.example` is provided in the repository.

### Setup Backend `.env`
Create a `.env` file inside the `server/` directory:
```bash
# In server/.env
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
PROJECTS_FILE=./data/projects.json
CONTACTS_FILE=./data/contacts.json
```

> **Note**: As configured in `.gitignore`, the actual `.env` file must never be committed to source control.

### Variable Definitions
| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Network port for the Express API server | `5000` |
| `ALLOWED_ORIGIN` | Allowed client origin for CORS requests | `http://localhost:5173` |
| `PROJECTS_FILE` | Relative or absolute path to the projects JSON data file | `./data/projects.json` |
| `CONTACTS_FILE` | Relative or absolute path to the contacts JSON data file | `./data/contacts.json` |

---

## Running the Application

To run the full-stack application, open **TWO separate terminal windows**:

### Terminal 1: Frontend (React / Vite)
From the repository root:
```bash
npm run dev
```
The frontend will start at: `http://localhost:5173/`

### Terminal 2: Backend (Node.js / Express)
From the repository root:
```bash
cd server
npm start
```
*(For development auto-reload, you may run `npm run dev`)*.  
The backend API server will start at: `http://localhost:5000/`

> **IMPORTANT**: Both servers must run concurrently for full frontend-backend integration.

---

## REST API Documentation

### 1. Health Check (`GET /`)
- **Method**: `GET`
- **URL**: `/`
- **Purpose**: Verify backend operational status.
- **Sample Request**:
  ```bash
  curl -i http://localhost:5000/
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "status": "ok"
  }
  ```

---

### 2. Get All Projects (`GET /api/projects`)
- **Method**: `GET`
- **URL**: `/api/projects`
- **Purpose**: Retrieve the full list of portfolio projects.
- **Sample Request**:
  ```bash
  curl -i http://localhost:5000/api/projects
  ```
- **Success Response (`200 OK`)**:
  ```json
  [
    {
      "id": "dqms",
      "title": "Digital Queue Management System",
      "description": "Developed a responsive full-stack Healthcare Queue Management System...",
      "techStack": ["React", "Node.js", "Express.js", "MongoDB", "MERN"],
      "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
      "link": "https://github.com/madaniritish/dqms_adv",
      "highlights": [
        "Real-time patient queue and token management",
        "Role-based doctor consultation workflow",
        "Automated appointment scheduling system"
      ]
    },
    {
      "id": "stay-nest",
      "title": "Stay Nest",
      "description": "A responsive full-stack Rental platform...",
      "techStack": ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
      "link": "https://github.com/madaniritish/StayNest",
      "highlights": [
        "Dynamic search and filtering for listings",
        "Host dashboard for property & reservation management",
        "Mobile-friendly interface and review system"
      ]
    },
    {
      "id": "ai-compiler-diagnosis",
      "title": "AI Assisted Compiler Error Diagnosis",
      "description": "AI-driven debugging system...",
      "techStack": ["Python", "AI/ML", "AST Parsing", "LLM APIs"],
      "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
      "link": "https://github.com/madaniritish/Compiler-Error-Diagnosis-System",
      "highlights": [
        "Deep AST syntax tree code analysis",
        "Plain English bug explanation engine",
        "Actionable code patch generation"
      ]
    }
  ]
  ```

---

### 3. Get Project by ID (`GET /api/projects/:id`)
- **Method**: `GET`
- **URL**: `/api/projects/:id`
- **Purpose**: Retrieve a single project matching the provided identifier.
- **Sample Request (Found)**:
  ```bash
  curl -i http://localhost:5000/api/projects/dqms
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "id": "dqms",
    "title": "Digital Queue Management System",
    "description": "Developed a responsive full-stack Healthcare Queue Management System...",
    "techStack": ["React", "Node.js", "Express.js", "MongoDB", "MERN"],
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    "link": "https://github.com/madaniritish/dqms_adv",
    "highlights": [
      "Real-time patient queue and token management",
      "Role-based doctor consultation workflow",
      "Automated appointment scheduling system"
    ]
  }
  ```
- **Sample Request (Not Found)**:
  ```bash
  curl -i http://localhost:5000/api/projects/999999
  ```
- **Failure Response (`404 Not Found`)**:
  ```json
  {
    "error": "Project not found"
  }
  ```

---

### 4. Submit Contact Message (`POST /api/contact`)
- **Method**: `POST`
- **URL**: `/api/contact`
- **Headers**: `Content-Type: application/json`
- **Purpose**: Validate and persist contact form submissions to `server/data/contacts.json`.
- **Sample Valid Request**:
  ```bash
  curl -i -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name": "John Doe", "email": "john@example.com", "message": "Hello"}'
  ```
- **Success Response (`201 Created`)**:
  ```json
  {
    "message": "Contact submission received successfully"
  }
  ```

#### Server-Side Validation Failure Responses (`400 Bad Request`):
- **Missing name**:
  ```json
  { "error": "Name is required" }
  ```
- **Missing email**:
  ```json
  { "error": "Email is required" }
  ```
- **Invalid email format**:
  ```json
  { "error": "Invalid email format" }
  ```
- **Missing message**:
  ```json
  { "error": "Message is required" }
  ```

---

### 5. Get Contact Submissions (`GET /api/contact`)
- **Method**: `GET`
- **URL**: `/api/contact`
- **Purpose**: Retrieve all persisted contact submissions from `server/data/contacts.json`.
- **Sample Request**:
  ```bash
  curl -i http://localhost:5000/api/contact
  ```
- **Success Response (`200 OK`)**:
  ```json
  [
    {
      "id": "c3249188-4c5d-47bd-9c0b-80569cb69c4b",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello",
      "createdAt": "2026-09-14T07:12:11.921Z"
    }
  ]
  ```

---

### 6. Catch-All 404 Handler
Any request to an undefined route returns a clean JSON error response rather than default Express HTML:
- **Sample Request**: `GET /api/doesnotexist`
- **Response (`404 Not Found`)**:
  ```json
  {
    "error": "Route not found"
  }
  ```

---

### 7. Centralized Error Handling & CORS
- **Global Error Middleware**: Catches unhandled errors and returns JSON `{ "error": "Internal server error" }` with an appropriate HTTP status (500) without exposing stack traces.
- **Malformed JSON Handling**: If a client sends invalid JSON, Express catches the syntax error and returns HTTP 400:
  ```json
  {
    "error": "Malformed JSON in request body"
  }
  ```
- **CORS Configuration**: Configured with `cors` to allow requests from `ALLOWED_ORIGIN` (`http://localhost:5173`), as well as originless requests (such as cURL, Postman, and automated scripts).

---

## Security Disclaimer

> **IMPORTANT SECURITY NOTE**:  
> The endpoint `GET /api/contact` is intentionally unauthenticated as explicitly required by the Assignment 3 evaluation instructions for grading verification. In a production environment, this endpoint would be secured with role-based access control (RBAC), API keys, or JWT authentication.

---

## cURL & Automated Testing

### Automated Test Suite
An automated verification test script is included in the `server/` folder. With the server running, execute:
```bash
cd server
node test-api.js
```
This runs 12 automated checks covering:
1. `GET /` health check
2. `GET /api/projects` list
3. `GET /api/projects/:id` item retrieval
4. `GET /api/projects/:id` 404 not found
5. `POST /api/contact` missing name validation
6. `POST /api/contact` missing email validation
7. `POST /api/contact` invalid email format validation
8. `POST /api/contact` missing message validation
9. `POST /api/contact` valid creation (HTTP 201)
10. `GET /api/contact` submission persistence verification
11. Catch-all 404 for undefined routes
12. Malformed JSON payload handling

### Detailed cURL Reference
For individual copy-pasteable commands in both Unix Bash and Windows PowerShell formats, please refer to [`server/curl-tests.md`](server/curl-tests.md).
