# Portfolio API - Backend Testing Documentation (cURL)

This document contains test cURL commands covering all endpoints, expected response statuses, and failure cases for the Portfolio backend API.

Ensure the backend server is running before executing these tests:
```bash
cd server
npm start
```
Default server URL: `http://localhost:5000`

---

## 1. Health Check Endpoint (`GET /`)

### Request
```bash
curl -i http://localhost:5000/
```
### Windows PowerShell Alternative
```powershell
curl.exe -i http://localhost:5000/
```
### Expected Status & Response
- **Status**: `200 OK`
- **Response**:
```json
{
  "status": "ok"
}
```

---

## 2. Get All Projects (`GET /api/projects`)

### Request
```bash
curl -i http://localhost:5000/api/projects
```
### Windows PowerShell Alternative
```powershell
curl.exe -i http://localhost:5000/api/projects
```
### Expected Status & Response
- **Status**: `200 OK`
- **Response**: Array of at least 3 project objects:
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
  ...
]
```

---

## 3. Get Single Project by ID - Success Case (`GET /api/projects/:id`)

### Request
```bash
curl -i http://localhost:5000/api/projects/dqms
```
### Windows PowerShell Alternative
```powershell
curl.exe -i http://localhost:5000/api/projects/dqms
```
### Expected Status & Response
- **Status**: `200 OK`
- **Response**: Matching project object JSON.

---

## 4. Get Single Project by ID - Not Found / Failure Case (`GET /api/projects/999999`)

### Request
```bash
curl -i http://localhost:5000/api/projects/999999
```
### Windows PowerShell Alternative
```powershell
curl.exe -i http://localhost:5000/api/projects/999999
```
### Expected Status & Response
- **Status**: `404 Not Found`
- **Response**:
```json
{
  "error": "Project not found"
}
```

---

## 5. Contact Form Submission - Valid Request (`POST /api/contact`)

### Request
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Ritish", "email": "ritish@example.com", "message": "Excited to connect!"}'
```
### Windows PowerShell Alternative
```powershell
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\": \"Ritish\", \"email\": \"ritish@example.com\", \"message\": \"Excited to connect!\"}"
```
### Expected Status & Response
- **Status**: `201 Created`
- **Response**:
```json
{
  "message": "Contact submission received successfully"
}
```

---

## 6. Contact Form Submission - Missing Name Failure Case (`POST /api/contact`)

### Request
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email": "ritish@example.com", "message": "Missing name"}'
```
### Windows PowerShell Alternative
```powershell
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"email\": \"ritish@example.com\", \"message\": \"Missing name\"}"
```
### Expected Status & Response
- **Status**: `400 Bad Request`
- **Response**:
```json
{
  "error": "Name is required"
}
```

---

## 7. Contact Form Submission - Missing Email Failure Case (`POST /api/contact`)

### Request
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Ritish", "message": "Missing email"}'
```
### Windows PowerShell Alternative
```powershell
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\": \"Ritish\", \"message\": \"Missing email\"}"
```
### Expected Status & Response
- **Status**: `400 Bad Request`
- **Response**:
```json
{
  "error": "Email is required"
}
```

---

## 8. Contact Form Submission - Invalid Email Format Failure Case (`POST /api/contact`)

### Request
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Ritish", "email": "invalid-email-format", "message": "Checking email regex"}'
```
### Windows PowerShell Alternative
```powershell
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\": \"Ritish\", \"email\": \"invalid-email-format\", \"message\": \"Checking email regex\"}"
```
### Expected Status & Response
- **Status**: `400 Bad Request`
- **Response**:
```json
{
  "error": "Invalid email format"
}
```

---

## 9. Contact Form Submission - Missing Message Failure Case (`POST /api/contact`)

### Request
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Ritish", "email": "ritish@example.com"}'
```
### Windows PowerShell Alternative
```powershell
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\": \"Ritish\", \"email\": \"ritish@example.com\"}"
```
### Expected Status & Response
- **Status**: `400 Bad Request`
- **Response**:
```json
{
  "error": "Message is required"
}
```

---

## 10. Get All Contact Submissions (`GET /api/contact`)

> **Security Note**: This endpoint is intentionally unauthenticated as requested by the Assignment 3 evaluation guidelines for grading verification.

### Request
```bash
curl -i http://localhost:5000/api/contact
```
### Windows PowerShell Alternative
```powershell
curl.exe -i http://localhost:5000/api/contact
```
### Expected Status & Response
- **Status**: `200 OK`
- **Response**:
```json
[
  {
    "id": "c3249188-4c5d-47bd-9c0b-80569cb69c4b",
    "name": "Ritish",
    "email": "ritish@example.com",
    "message": "Excited to connect!",
    "createdAt": "2026-09-14T07:12:11.921Z"
  }
]
```

---

## 11. Undefined Route 404 Catch-All (`GET /api/doesnotexist`)

### Request
```bash
curl -i http://localhost:5000/api/doesnotexist
```
### Windows PowerShell Alternative
```powershell
curl.exe -i http://localhost:5000/api/doesnotexist
```
### Expected Status & Response
- **Status**: `404 Not Found`
- **Response**:
```json
{
  "error": "Route not found"
}
```

---

## 12. Malformed JSON Request Handling (`POST /api/contact`)

### Request
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{ invalid json }'
```
### Windows PowerShell Alternative
```powershell
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{ invalid json }"
```
### Expected Status & Response
- **Status**: `400 Bad Request`
- **Response**:
```json
{
  "error": "Malformed JSON in request body"
}
```
*(The server continues running without crashing).*
