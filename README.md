# 🚧 ConTrack-DPR
### Construction Field Management Web App

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38BDF8?logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-v6-red?logo=reactrouter)
![Status](https://img.shields.io/badge/Status-Frontend_Task-success)

A **modern responsive web application** built using **React.js** that simulates a **Construction Field Management System**.

ConTrack-DPR helps teams manage projects and submit **Daily Progress Reports (DPR)** efficiently from **mobile, tablet, or desktop devices**.

---

# ✨ Features

### 🔐 Login Authentication
Secure mock login system with validation.

Test Credentials:

```
Email: test@test.com
Password: 123456
```

Features:
- Email validation
- Error messages for incorrect login
- Redirect to project dashboard on success

---

### 📁 Project List Dashboard

View all construction projects in a **clean card-based UI**.

Each project displays:

- 🏗 Project Name  
- 🟢 Status Badge  
- 📅 Start Date  
- 📍 Location  

Features:

- Click any project to open the **DPR Form**
- Responsive card layout
- Optional project status filter

---

### 📝 Daily Progress Report (DPR) Form

Submit field updates directly from the app.

Form Fields:

- Project Selection (Dropdown)
- Date Picker
- Weather Selection  
  - ☀ Sunny  
  - ☁ Cloudy  
  - 🌧 Rainy
- Work Description (Textarea)
- Worker Count (Number Input)
- Photo Upload (1–3 images)

Features:

- Image preview thumbnails
- Form validation
- Success confirmation
- Navigation back to Project List

---

# 📱 Responsive Design

The UI follows a **mobile-first approach** and adapts seamlessly across devices.

| Device | Screen Width |
|------|------|
| 📱 Mobile | 375px |
| 📟 Tablet | 768px |
| 💻 Desktop | 1280px+ |

✔ No horizontal scrolling  
✔ Clean spacing and layout  
✔ Smooth responsive transitions

---

# 🛠 Tech Stack

| Technology | Purpose |
|------|------|
| React.js | Frontend framework |
| Vite | Fast build tool |
| React Router v6 | Page routing |
| Tailwind CSS | Styling |
| Axios / Fetch API | Data fetching |
| React Hooks | State management |

---

# 📂 Project Structure

```
ConTrack-DPR
│
├── src
│   ├── components
│   │   ├── ProjectCard.jsx
│   │   └── ImageUpload.jsx
│   │
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── ProjectList.jsx
│   │   └── DPRForm.jsx
│   │
│   ├── constants
│   │   └── projects.js
│   │
│   ├── utils
│   │   └── validation.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

The structure separates **pages, components, constants, and utilities** for maintainable and scalable code.

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ConTrack-DPR.git
```

---

### 2️⃣ Navigate into the Project

```bash
cd ConTrack-DPR
```

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Run Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

# ✅ Implemented Features

✔ Login Screen  
✔ Project List Dashboard  
✔ DPR Submission Form  
✔ Image Upload with Preview  
✔ Client-Side Routing  
✔ Responsive UI  
✔ Form Validation

---

# ⭐ Bonus Features (Optional)

- Dark Mode Toggle
- Project Status Filter
- Smooth UI Animations
- Deployment on Vercel / Netlify

---

# ⚠ Known Limitations

- Authentication is **mock-based**
- DPR submissions are **not stored in a database**
- Image uploads are **preview only**

---

# 🌍 Deployment

Live Demo (Optional)

```
https://your-project.vercel.app
```

---

# 🎥 Video Walkthrough

5–10 minute explanation of the implementation.

Add your video link here:

```
Loom / YouTube Link
```

---

# 📩 Submission

**Deadline:**  
13th March 2026 — 12:00 PM

Submit the following:

- GitHub Repository Link
- Video Walkthrough

Send to:

```
contact@getflytechnologies.com
```

---

# 👨‍💻 Author

**Om Mhaismale**

BTech Student • Frontend Developer • Data Enthusiast

```
Built with ⚡ React + Tailwind
```
