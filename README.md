# 🏥 DocReserve – Healthcare Appointment Management System

DocReserve is a **Full Stack Healthcare Appointment Management System** built using the **MERN Stack**. It provides separate **Patient, Doctor, and Admin** portals for managing healthcare appointments, secure authentication, online payments, and digital prescriptions.

---

## 📌 Project Overview

Traditional appointment booking systems involve manual scheduling, long waiting times, and paper-based prescriptions. DocReserve digitizes the complete appointment workflow by providing an easy-to-use web platform for patients, doctors, and administrators.

---

## ✨ Features

### 👤 Patient Module

- User Registration & Login (JWT Authentication)
- Browse Doctors by Speciality
- Book Appointments
- Cancel Appointments
- Razorpay Online Payment
- View Appointment History
- View & Download Digital Prescriptions
- Update Personal Profile

---

### 👨‍⚕️ Doctor Module

- Secure Doctor Login
- Doctor Dashboard
- View Assigned Appointments
- Complete Appointments
- Upload Prescription (PDF/Image)
- Add Prescription Notes
- Update Doctor Profile

---

### 🛠️ Admin Module

- Secure Admin Login
- Dashboard Analytics
- Add New Doctors
- Manage Doctor Availability
- View All Doctors
- View All Appointments
- Monitor System Activity

---

## 🚀 Tech Stack

### Frontend

- React.js
- React Router DOM
- Context API
- Axios
- Tailwind CSS
- React Toastify

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Multer

### Database

- MongoDB Atlas
- Mongoose

### Cloud Services

- Cloudinary (Image & Prescription Storage)
- Razorpay (Online Payment Gateway)

---

# 📂 Project Structure

```
DocReserve
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── context
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── admin
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── context
│   │   └── assets
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── server.js
```

---

# ⚙️ System Architecture

```
                Patient / Doctor / Admin
                        │
                        ▼
                React Frontend
         (Context API + Axios + Router)
                        │
                        ▼
              Express REST APIs
                        │
          JWT Authentication Middleware
                        │
                        ▼
                 MongoDB Atlas
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
     Cloudinary                  Razorpay
(Prescriptions & Images)     (Payment Gateway)
```

---

# 🔐 Authentication

The application implements **JWT-based Role Authentication**.

Roles:

- Patient
- Doctor
- Admin

Middleware:

- authUser
- authDoctor
- authAdmin

Passwords are securely hashed using **bcrypt**.

---

# 💳 Payment Workflow

```
Patient Books Appointment
          │
          ▼
Create Razorpay Order
          │
          ▼
Payment Gateway
          │
          ▼
Verify Payment
          │
          ▼
Appointment Payment Updated
```

---

# 📄 Prescription Workflow

```
Doctor Uploads Prescription
          │
          ▼
Multer
          │
          ▼
Cloudinary Storage
          │
          ▼
Prescription URL Stored in MongoDB
          │
          ▼
Patient Can View & Download
```

---

# 🗄️ Database Collections

### User

- Name
- Email
- Password
- Phone
- Gender
- DOB
- Address
- Image

### Doctor

- Name
- Email
- Speciality
- Experience
- Fees
- Availability
- Slots Booked
- Image

### Appointment

- User ID
- Doctor ID
- Appointment Date
- Appointment Time
- Amount
- Payment Status
- Cancellation Status
- Completion Status
- Prescription URL
- Doctor Notes

---

# 🔗 REST APIs

## User APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/user/register |
| POST | /api/user/login |
| GET | /api/user/get-profile |
| POST | /api/user/update-profile |
| POST | /api/user/book-appointment |
| GET | /api/user/appointments |
| POST | /api/user/cancel-appointment |
| POST | /api/user/payment-razorpay |
| POST | /api/user/verify-razorpay |

---

## Doctor APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/doctor/login |
| GET | /api/doctor/dashboard |
| GET | /api/doctor/appointments |
| GET | /api/doctor/profile |
| POST | /api/doctor/update-profile |
| POST | /api/doctor/complete-appointment |
| POST | /api/doctor/upload-prescription |

---

## Admin APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/admin/login |
| POST | /api/admin/add-doctor |
| GET | /api/admin/dashboard |
| GET | /api/admin/all-appointments |
| GET | /api/admin/all-doctors |
| POST | /api/admin/change-availability |

---

# 🔒 Security Features

- JWT Authentication
- Role-Based Authorization
- Password Hashing (bcrypt)
- Protected Routes
- Environment Variables
- Payment Verification
- Secure Cloudinary Storage

---

# 🎯 Key Features

- Full Stack MERN Application
- Responsive UI
- JWT Authentication
- Role-Based Access Control
- Appointment Scheduling
- Online Payment Integration
- Digital Prescription Upload
- Cloud Storage Integration
- Admin Analytics Dashboard

---

# 📸 Screenshots

> Add screenshots after deployment.

- Home Page
- Doctor Listing
- Appointment Booking
- Patient Dashboard
- Doctor Dashboard
- Admin Dashboard
- Prescription Module
- Payment Page

---

# 🛠️ Installation

## Clone Repository

```bash
git clone https://github.com/gobi2001-2006/DocReserve.git
```

---

## Backend

```bash
cd backend

npm install

npm run server
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Admin

```bash
cd admin

npm install

npm run dev
```

---

# 🌍 Environment Variables

Backend `.env`

```env
MONGODB_URI=

JWT_SECRET=

ADMIN_EMAIL=

ADMIN_PASSWORD=

CLOUDINARY_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_SECRET_KEY=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=
```

Frontend `.env`

```env
VITE_BACKEND_URL=

VITE_RAZORPAY_KEY_ID=
```

Admin `.env`

```env
VITE_BACKEND_URL=
```

---

# 📚 Learning Outcomes

This project helped in gaining practical experience with:

- React.js
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- REST API Development
- Razorpay Payment Integration
- Cloudinary Integration
- Context API
- Mongoose ODM
- Git & GitHub
- Full Stack Application Development

---

# 🚀 Future Enhancements

- Email Notifications
- Video Consultation
- AI-based Doctor Recommendation
- Appointment Reminder
- Medical Report Management
- Dashboard Charts & Analytics
- Search & Filters
- Multi-language Support

---

# 👨‍💻 Author

**Gobika K**

B.Tech Artificial Intelligence & Data Science

Madras Institute of Technology (MIT), Anna University

GitHub: https://github.com/gobi2001-2006

---
