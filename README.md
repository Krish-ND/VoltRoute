# ⚡ VoltRoute — Smart EV Trip Planner

**VoltRoute** is a modern web application built for **Indian EV owners** to plan smarter electric vehicle journeys. It calculates trip costs, predicts battery consumption, discovers nearby charging stations, generates trip bills, and compares EV vs petrol expenses — all in one place.

> _Plan Smarter EV Journeys._

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Smart Routes** | Enter origin & destination to get instant route analysis |
| 🔋 **Battery AI** | Predicts battery consumption & reachability for your trip |
| ⛽ **EV vs Fuel** | Side-by-side cost comparison — EV trips save up to **84%** |
| 📍 **20+ Charging Stations** | Find fast chargers, standard chargers, and battery swap stations across major Indian cities |
| 🧾 **Trip Bills** | Auto-generate detailed trip bills with cost breakdowns |
| 📱 **Installable PWA** | Network resilient; operates smoothly offline or in highway dead-zones via Service Workers |
| 🛡️ **Enterprise Security** | Granular Firebase Database Row-Level Security and React Error Boundaries built-in |
| 🌗 **Dark Mode** | Seamless transition to a sleek dark interface via CSS variable inversion |
| 🧑‍💻 **User Profiles** | Dedicated profile management bound natively to secure cloud endpoints |
| 🤖 **NextGen FlashVolt AI** | Connected directly to an Open Source LLM API for advanced, conversational EV assistance |
| 🔐 **Auth + Demo Mode** | Firebase authentication with a built-in demo mode for instant access |

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Maps:** [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- **Backend / Auth:** [Firebase](https://firebase.google.com/) (Authentication + Firestore fully secured with RLS)
- **AI Core:** [Pollinations.ai](https://pollinations.ai/) (NextGen Open Model bridging)
- **PWA:** `vite-plugin-pwa` for edge-caching and offline modes
- **UI:** [Headless UI](https://headlessui.com/), Google Material Symbols

---

## 📁 Project Structure

```
voltroute-app/
├── public/                  # Static assets (favicon, images)
├── src/
│   ├── assets/              # App assets
│   ├── components/
│   │   ├── FlashVolt/       # FlashVolt AI chat/voice assistant
│   │   └── Layout/          # Navbar, ProtectedRoute wrappers
│   ├── config/
│   │   └── firebase.js      # Firebase config + demo mode detection
│   ├── context/
│   │   └── AuthContext.jsx   # Auth provider (Firebase + demo fallback)
│   ├── hooks/
│   │   └── useTrips.js       # Trip data hook
│   ├── pages/
│   │   ├── Landing.jsx       # Public landing page
│   │   ├── Auth.jsx          # Sign in / Sign up
│   │   ├── Dashboard.jsx     # Main trip planner dashboard
│   │   ├── Analytics.jsx     # Trip analytics & charts
│   │   ├── History.jsx       # Past trip history
│   │   ├── Stations.jsx      # Charging station finder
│   │   └── Settings.jsx      # User settings
│   ├── services/
│   │   ├── billing.js        # Trip billing logic
│   │   ├── stations.js       # Charging station data
│   │   └── vehicles.js       # EV vehicle specs
│   ├── App.jsx               # Root component with routes
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles & Tailwind imports
├── .env                      # Environment variables (Firebase keys)
├── index.html                # HTML entry point
├── vite.config.js            # Vite + Tailwind plugin config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or later recommended)
- **npm** (comes with Node.js) or **yarn**

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd voltroute-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

The app ships with a `.env` file containing placeholder Firebase keys. **You have two options:**

#### Option A — Demo Mode (no Firebase needed) ✅

Simply leave the `.env` file as-is. The app automatically detects placeholder keys and boots into **demo mode** — authentication works locally with mock data, so you can explore all features right away.

#### Option B — Connect your own Firebase project

1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password) and **Firestore**.
3. Copy your project's config and update `.env`:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start the development server

```bash
npm run dev
```

This starts the Vite dev server with hot-module replacement.

### 5. Open in your browser

Once the server is running you'll see output like:

```
  VITE v8.x.x  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the app.

> **Tip:** The server is configured to auto-open the browser when started. If it doesn't, manually navigate to the URL above.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server on `localhost:3000` |
| `npm run build` | Create an optimised production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🧪 Demo Mode

VoltRoute includes a **built-in demo mode** so the app is fully functional without configuring Firebase:

- Sign up / login works with any email & password (stored in `localStorage`)
- All dashboard features (trip planning, analytics, history, stations) are available
- Demo mode activates automatically when Firebase keys are missing or contain placeholder values

---

## 📄 License

© 2026 VoltRoute. All rights reserved.
