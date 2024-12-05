# Live Demo
Check out the live demo of the form builder at: [Live Demo](https://form-builder-mern.onrender.com/)

---
# Form Builder Application

A full-stack **Form Builder Application** built using the **MERN Stack** (MongoDB, Express, React, Node.js) and **Tailwind CSS**. This application allows users to create and edit forms with three specific question types: **Categorize**, **Cloze**, and **Comprehension**. Users can preview or fill out the forms and store the responses in the backend.

---

## Features

### 1. Form Editor
- Create forms with an intuitive UI.
- Add various question types:
  - **Categorize**: Questions requiring categorization of items.
  - **Cloze**: Fill-in-the-blank questions.
  - **Comprehension**: Questions based on a provided passage.
- Upload images for each question (limited to 10 MB).
- Add a header image for the form.

### 2. Form Preview/Fill
- Generate a shareable preview/fill link for each form.
- Fill in forms and save responses to the backend.

### 3. Data Storage
- Store form data, questions, and user responses in a **MongoDB** database.
- Use well-defined schemas for structured data storage.

---

## Tech Stack

### Frontend
- **React.js**: Manages the UI for creating and previewing forms.
- **Tailwind CSS**: Provides a responsive and modern design.

### Backend
- **Node.js**: Server-side logic.
- **Express.js**: API routing and middleware.

### Database
- **MongoDB**: Stores form data and user responses.

---

## Getting Started

### Prerequisites
- Node.js and npm installed.
- MongoDB instance running locally or in the cloud.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/form-builder.git
   cd form-builder
2. **Install dependencies:**:
   ```bash
   npm install
   cd server
   npm install
3. **Set up environment variables: Create a .env file in the root directory with the following:**:
   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
3. **Set up environment variables: Create a .env file in the root directory with the following:**:
   ```bash
   Start the backend:
   npm run server
   
   Start the frontend:
   cd server
   npm start
