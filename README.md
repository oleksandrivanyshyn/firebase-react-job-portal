# Firebase & React Job Portal

A modern Single Page Application (SPA) for searching and posting jobs, built with **React** and **Firebase**. The project features a role-based access model (User / Admin), user profile management, and real-time tracking of job applications.

---

## ✨ Features

* **Authentication (Firebase Auth):** User registration and login with protected and public routing.
* **User Profile (Dashboard):** 
    * Personal information editing.
    * Adding and updating work experience and education histories.
* **Job Management:**
    * Creating, editing, and deleting own job postings.
    * Reviewing candidates who applied for a job (Applied Candidates).
    * Searching and filtering job openings on the main page.
* **Admin Dashboard:**
    * Viewing and moderating all platform users (`AllUsers`).
    * Moderating all published job openings (`AllJobs`).
* **State Management:** Utilizing **Redux Toolkit** for global state handling (alerts, loading states).
* **Notification System:** Implemented via push notifications or internal user alerts.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, React Router v6
* **State Management:** Redux Toolkit (slices for alert, notifications)
* **Backend-as-a-Service:** Firebase (Firestore DB, Firebase Auth)
* **Styling:** Custom CSS / Layout CSS
* **Linter/Formatter:** Prettier

---

## 📂 Project Structure

```text
src/
├── apis/                  # Firebase API requests (auth, jobs, users)
├── components/            # Reusable components (Loader, Filters, Layout)
├── firebaseConfig.js      # Firebase configuration & initialization
├── pages/
│   ├── Home.js            # Main page with job list
│   ├── Login/Register.js  # Authentication pages
│   ├── admin/             # Admin panel dashboards (AllJobs, AllUsers)
│   └── user/              # User profiles, job posting, and application tracking
├── redux/                 # State management configuration (store, slices)
└── stylesheets/           # Project styles (layout, custom-components)
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/oleksandrivanyshyn/firebase-react-job-portal.git
cd firebase-react-job-portal-277b9b1fc6d8cf48d5c567f665ad6c9df12a75e0
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the project in development mode

```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

---

## 🔧 Scripts

* `npm start` — Runs the app in the local development mode.
* `npm run build` — Builds the app for production to the `build` folder.
* `npm test` — Launches the test runner.
