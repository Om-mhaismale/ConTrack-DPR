# ConTrack DPR

**Construction Field Management Web App** — submit and track Daily Progress Reports from any device.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7-red?logo=reactrouter)

---

## Features

| Feature | Details |
|---|---|
| **Login** | Mock auth with email + password validation |
| **Project Dashboard** | Card grid with status filter (All / In Progress / Pending / Completed) |
| **DPR Form** | Project, date, weather, description, worker count, photo upload (1–3 images) |
| **Dark Mode** | Toggle via navbar — persisted in `localStorage` |
| **Validation** | Descriptive field-level error messages on all forms |
| **Responsive** | Mobile-first, works on 375 px → 1440 px+ |
| **Animations** | Staggered card entrance, hover micro-interactions |

---

## Demo credentials

```
Email:    test@test.com
Password: 123456
```

---

## Quick start

### 1. Clone

```bash
git clone https://github.com/your-username/ConTrack-DPR.git
cd ConTrack-DPR
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

| Command | Purpose |
|---|---|
| `npm run build` | Production bundle in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
├── assets/             # Static assets (logo, etc.)
├── components/
│   ├── Navbar.jsx      # Top nav with dark mode toggle + logout
│   └── ProtectedRoute.jsx
├── constants/
│   └── projects.js     # Project data, statusConfig, weatherOptions
├── context/
│   ├── AuthContext.jsx  # Login / logout state
│   └── ThemeContext.jsx # Dark mode toggle (persisted)
├── pages/
│   ├── Login.jsx        # Auth screen
│   ├── ProjectList.jsx  # Dashboard with project cards + filter
│   └── DPRForm.jsx      # Daily progress report form
├── utils/
│   └── validation.js   # validateLogin, validateDPRForm
├── App.jsx             # Route definitions
├── index.css           # Tailwind v4 imports + dark variant
└── main.jsx
```

---

## Tech stack

| Library | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool |
| Tailwind CSS | 4 | Utility-first styling |
| React Router | 7 | Client-side routing |
| Lucide React | latest | Icon set |

---

## Known limitations

- Authentication is **mock-based** (no real backend)
- DPR submissions are **not persisted** (no database)
- Image uploads generate **local object URLs** — preview only

---

## Author

**Om Mhaismale**

BTech Student • Frontend Developer • Data Enthusiast

```
Built with ⚡ React + Tailwind
```
