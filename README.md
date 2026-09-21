# 🚀 Autonomous Multi-Agent Customer Support & Intelligence Engine

An enterprise-grade, multi-tenant AI command center for real-time customer support ticket classification, sentiment analysis, churn vulnerability prediction, RAG vector similarity search, root-cause diagnosis, automated resolution drafting, and operational incident management.

---

## ✨ Key Capabilities

- 🤖 **Multi-Agent AI Pipeline**: Powered by LangChain & Groq (LLaMA 3.1) for instant category classification, sentiment analysis, priority detection, root cause analysis, and churn risk scoring.
- 🔐 **Multi-Tenant Data Isolation**: Complete SQLite per-user workspace isolation (`app.db`). Every user account maintains a isolated dataset of tickets, analytics, knowledge entries, and alerts.
- 🔑 **Google OAuth & JWT Authentication**: Support for Google SSO login alongside standard credential registration, password update security, and 12-hour signed JWT sessions.
- 📚 **Auto-Expanding Knowledge Repository**: Real-time auto-cataloging of analyzed issues, root-cause diagnoses, and AI resolutions with live polling and search filtering.
- 🔥 **Real-Time Critical Incident Feed**: Automated P1/Critical spike detection and churn vulnerability alerts based on SLA thresholds.
- 📊 **Executive Operations Dashboard**: Interactive analytics charts (Recharts), SLA resolution metrics, sentiment breakdown, and automated executive summary generation.
- 🧠 **Vector RAG Similarity Search**: Powered by ChromaDB & Sentence Transformers (`all-MiniLM-L6-v2`) for context-aware historical ticket context retrieval.
- 🎨 **Luxury Dark Glassmorphic UI**: Premium UI design system built with React, Vite, Tailwind CSS, Lucide Icons, and smooth animations.

---

## 🛠️ Tech Stack

### **Backend**
- **Framework**: FastAPI (Python 3.11)
- **Database**: SQLite (`app.db`), ChromaDB (Vector Store)
- **AI / LLM**: Groq LLaMA 3.1, LangChain, Sentence-Transformers (`all-MiniLM-L6-v2`)
- **Authentication**: PyJWT, OAuth 2.0 (Google SSO)
- **Real-Time**: Socket.io / ASGI

### **Frontend**
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS, Glassmorphism design system
- **Visualization**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios with Bearer token interceptors

---

## 📁 Repository Structure

```
customer-support-agent/
├── backend/
│   ├── app/
│   │   ├── agents/            # LLM Multi-Agent definitions (classifier, sentiment, priority, churn, etc.)
│   │   ├── api/               # FastAPI route controllers (routes, analytics, incidents, knowledge, etc.)
│   │   ├── database/          # SQLite DB models & ChromaDB embeddings store
│   │   ├── dependencies/      # JWT auth verification middleware
│   │   ├── models/            # Pydantic data schemas
│   │   ├── services/          # RAG, SLA, escalation, analytics, and knowledge services
│   │   ├── utils/             # Loggers and ticket parsers
│   │   └── main.py            # FastAPI main entrypoint & Socket.io app
│   ├── config.py              # Application settings
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/        # Analytics, IncidentAlerts, KnowledgeBase, Workspace, Header, Sidebar
│   │   ├── pages/             # Dashboard, TicketAnalysis, Incidents, KnowledgeBase, Login, Settings
│   │   ├── services/          # API axios service endpoints
│   │   ├── App.jsx            # Main React routing & theme provider
│   │   └── index.css          # Tailwind CSS glassmorphism directives
│   └── package.json           # Node dependencies
├── scripts/
│   └── ingest_data.py         # Seed ChromaDB vector store
├── docker-compose.yml         # Container deployment configuration
└── README.md
```

---

## ⚡ Quick Start (Local Setup)

### Prerequisites
- **Python 3.10+**
- **Node.js 18+**

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=customer-support-agent-secret-2026
```

#### Seed Vector Data (ChromaDB)
From the **project root** (`customer-support-agent/`):
```bash
python scripts/ingest_data.py
```

#### Run FastAPI Backend Server
```bash
# From project root
backend\venv\Scripts\python.exe -m uvicorn backend.app.main:socket_app --reload --host 127.0.0.1 --port 8000
```
*Backend API will be running at `http://127.0.0.1:8000`*

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```
*Frontend Web App will be running at `http://localhost:5173`*

---

## 🔑 Demo Access Credentials

| Method | Identifier | Password / Flow |
|---|---|---|
| **Demo Admin** | `admin` | `SupportAI#2026!Admin` |
| **Google SSO** | Click *"Continue with Google OAuth"* | Interactive Google Account SSO |
| **New Account** | Click *"Create Account"* | Custom Username & Password |

---

## 📡 API Endpoint Overview

| Endpoint | Method | Description |
|---|---|---|
| `/login` | `POST` | Authenticate user credentials & receive JWT token |
| `/google-login` | `POST` | Authenticate / register Google SSO account |
| `/register` | `POST` | Create new user account |
| `/change-password` | `POST` | Update account password in SQLite DB |
| `/analyze-ticket` | `POST` | Execute Multi-Agent pipeline on raw customer text |
| `/analytics` | `GET` | Retrieve user-isolated stats, categories, & sentiment metrics |
| `/incidents` | `GET` | Fetch active P1/Critical incidents & high churn alerts |
| `/knowledge-base` | `GET` | Fetch auto-cataloged knowledge repository entries |
| `/semantic-clusters`| `GET` | Retrieve semantic vector issue clusters |
| `/executive-summary`| `GET` | Generate executive operations summary |
| `/trends` | `GET` | Fetch detected system trend anomalies |

---

## 🐳 Docker Deployment

To run both backend and frontend in Docker containers:

```bash
docker-compose up --build
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
