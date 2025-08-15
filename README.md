# Event Management System 🚀

A full-stack web application designed to streamline the process of creating, discovering, and managing events. This platform provides a seamless experience for both event organizers and attendees.

---

## ✨ Features

-   **User Authentication**: Secure sign-up and login functionality for users.
-   **Event Management**: Organizers can create, update, read, and delete events (CRUD).
-   **Event Discovery**: Users can browse, search, and filter through a list of upcoming events.
-   **Booking System**: Attendees can easily register for or book tickets for an event.
-   **User Dashboard**: A personalized dashboard for users to view their upcoming events and for organizers to manage the events they've created.

---

## 💻 Tech Stack

-   **Frontend**: React.js
-   **Backend**: Node.js, Express.js
-   **Database**: A SQL-based database (e.g., MySQL, PostgreSQL)
-   **Package Manager**: npm

---
## 📂 Project Structure

- **Event_Management_System_Project/**
  - `frontend/`: Contains all the React frontend code
  - `backend/`: Contains the Node.js/Express backend server and API logic
  - `SQL/`: Contains the database schema (.sql file)
  - `README.md`
---

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:
* [Node.js](https://nodejs.org/en/) (v14 or higher is recommended)
* [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
* A running SQL database server (e.g., [MySQL](https://www.mysql.com/) or [PostgreSQL](https://www.postgresql.org/))

---

### 🔧 Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/Sanzidislam/Event_Management_System_Project.git](https://github.com/Sanzidislam/Event_Management_System_Project.git)
    cd Event_Management_System_Project
    ```

2.  **Set up the Database**
    * Start your SQL database server.
    * Create a new database for the project (e.g., `event_db`).
    * Import the database schema provided in the `SQL/` folder into your newly created database. This will create all the necessary tables.

3.  **Configure the Backend**
    * Navigate to the backend directory:
        ```sh
        cd backend
        ```
    * Create a `.env` file in the `backend` directory. This file will store your sensitive credentials. Add the following configuration, replacing the placeholder values with your actual database credentials:
        ```env
        DB_HOST=localhost
        DB_USER=your_db_username
        DB_PASSWORD=your_db_password
        DB_NAME=event_db
        PORT=5001
        ```
    * Install the required npm packages:
        ```sh
        npm install
        ```

4.  **Configure the Frontend**
    * Navigate to the frontend directory from the root project folder:
        ```sh
        cd frontend
        ```
    * Install the required npm packages:
        ```sh
        npm install
        ```

---

## ▶️ Usage

To run the application, you need to start both the backend and frontend servers.

1.  **Start the Backend Server**
    * In the `backend` directory, run:
        ```sh
        npm start
        ```
    * The server should now be running on `http://localhost:5001` (or the port you specified in your `.env` file).

2.  **Start the Frontend Application**
    * In a separate terminal, navigate to the `frontend` directory and run:
        ```sh
        npm start
        ```
    * The React development server will start, and the application will automatically open in your web browser at `http://localhost:3000`.

You can now interact with the Event Management System in your browser! 🎉