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

## 🌟 Features

- User Registration & Login
- Token-based Authentication (DRF Auth)
- Save and Unsave Launches (per user)
- View Upcoming Launches
- View Past Launches
- Browse Astronaut Profiles
- User Dashboard to preview saved launches
- Logout functionality to invalidate tokens
- Dynamic and responsive user interface
- Real-time updates for space data
- Cross-platform compatibility for modern browsers and devices