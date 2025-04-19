# 🚀 Space Launch Tracker

A full-stack web application that allows users to explore, track, and save upcoming and past space launches from agencies like **SpaceX** and **SpaceDev**.

Users can log in to **save their favorite launches** for later viewing. The site displays data about **launches, astronauts, and rockets** in a simple and intuitive interface.

---

## 📦 Tech Stack

### 🔧 Backend (API)
- **Django**
- **Django REST Framework**
- **Token Authentication**
- Custom models for:
  - Saved SpaceX Launches
  - Saved SpaceDev Launches

### 💻 Frontend
- **React**
- **Axios** for API calls
- **JWT Token** stored in localStorage
- Conditional rendering based on authentication

---

## 🔐 Features

- User Registration & Login
- Token-based Authentication (DRF Auth)
- Save/Unsave Launches (per user)
- View:
  - Upcoming Launches
  - Past Launches
  - Astronaut Profiles
  - Rocket Details
- User Dashboard (preview of saved launches)
- Logout to invalidate token
