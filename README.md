# 🚀 Space Launch Tracker

A full-stack web application that allows users to explore, track, and save upcoming and past space launches from agencies.

Users can log in to **save their favorite launches** for later viewing. The site displays data about **launches, and astronauts** in a simple and intuitive interface.

---

## 📦 Tech Stack

### 🔧 Backend (API)
- **Django**
- **Django REST Framework**
- **Token Authentication**
- Custom models for:
  - Saved SpaceDev Launches

### 💻 Frontend
- **React**
- **Axios** for API calls
- **(DRF standard Token)** stored in localStorage
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
- User Dashboard (preview of saved launches)
- Logout to invalidate token
