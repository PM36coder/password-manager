PassVault - A Secure MERN Stack Password Manager
Introduction
PassVault is a secure password manager built on the MERN stack (MongoDB, Express.js, React, Node.js). It helps users store, manage, and protect their passwords. The main objective of this project is to provide a high level of security by utilizing features like password hashing and sensitive data encryption.

Key Features
Secure Authentication: Utilizes JSON Web Tokens (JWT) for login and signup.

Password Hashing: User passwords are hashed with the bcrypt library to prevent them from being stored in plain text in the database.

Data Encryption: Each user's password and other sensitive data are encrypted using Node.js's crypto module before being saved to the database.

Responsive UI: A sleek and attractive user interface built with React and Tailwind CSS that works on all devices.

Easy Password Management: Users can add, view, update, and delete their saved passwords.

Tech Stack
Frontend
React: For building the user interface.

React Router: For navigation within the single-page application (SPA).

Tailwind CSS: For rapid UI design.

Axios: For communicating with the backend API.

Lucide-React: For a wide range of icons.

Backend
Node.js & Express.js: For server-side logic and building the REST API.

Mongoose: An ODM (Object Data Modeling) library for interacting with MongoDB.

JWT: For generating and verifying authentication tokens.

bcrypt.js: For hashing passwords.

crypto: For encrypting sensitive data.

Database
MongoDB: A NoSQL database used to store user data and passwords.

Security Overview
This project places a strong emphasis on security:

Password Hashing: When a new user signs up, their password is hashed using bcrypt before being saved to the database. This ensures that even if the database is compromised, the passwords remain secure.

Data Encryption: The passwords that users add are encrypted before being stored in the database. This data can only be decrypted with the user's master password.

JWT Authentication: Every request is verified using a JWT, which helps prevent unauthorized access.

Installation and Setup
Prerequisites
Node.js (v14 or above)

npm or yarn

MongoDB (or MongoDB Atlas)

Step 1: Clone the Repository
git clone https://github.com/PM36coder/PassVault.git
cd PassVault

Step 2: Backend Setup
Create a .env file in the server folder and fill in the following details:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=32_character_encryption_key

Now, install dependencies and start the server:

cd server
npm install
npm start

The server will be running at http://localhost:5173.

Step 3: Frontend Setup
In the client folder, install dependencies and start the app:

cd ../client
npm install
npm start

The app will be running at http://localhost:3000.

Usage
Sign Up: First, create an account on the signup page.

Login: After creating an account, log in.

Manage Passwords: After logging in, you can access your password vault where you can add new passwords, view existing ones, or delete them.

Future Improvements
Two-Factor Authentication (2FA)

Password Generator

Browser Extension

Password Strength Indicator

License
This project is licensed under the MIT License.