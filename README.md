# AI Automation Lab

A modular AI-driven system integrating offline intelligence, automation, and web technologies — designed for self-hosted, independent AI and automation development.

---------------------------------------------------------------------

## Project Structure

ai-automation-lab/
│
├── ai_py/         # Python AI core (RAG chatbot, LangChain, automations)
├── be_node/       # Node.js backend (API, routing, connects AI ↔ frontend)
├── fe_react/      # React frontend (dashboard, chatbot UI)
└── README.md

---------------------------------------------------------------------

## ai_py — Python AI Core

Handles AI logic, embeddings, RAG (Retrieval-Augmented Generation), and local automation tools.

### Environment Setup
python -m venv aipy
source aipy/Scripts/activate

### Installed Libraries
Core dependencies include:
- LangChain — framework for building modular LLM/RAG pipelines
- FAISS — vector database for storing and searching embeddings locally
- Sentence Transformers — model for embedding text and documents
- Requests, Flask, dotenv — for API and environment handling

### Freeze Environment
pip freeze > requirements.txt

### Modules (Planned)
offline-rag/
│
├── data/                # PDFs, documents, or text files for knowledge base
├── embeddings/          # FAISS vector store and cached models
├── models/              # Pretrained SentenceTransformer or LLM models
├── utils/               # Pre/post processing, chunking, embedding tools
├── rag_pipeline.py      # Main RAG flow
└── app.py               # Flask/FastAPI endpoint for backend to call

---------------------------------------------------------------------

## be_node — Backend API (Node.js)

Acts as a bridge between frontend and Python AI backend.

### Structure
be_node/
├── server.js            # Main entry point (Express server)
├── routes/
│   └── ai.js            # Handles /ai requests and forwards to Python backend
├── .env                 # Stores API keys and configs
└── package.json

### Responsibilities
- Receives requests from frontend
- Calls Python scripts via HTTP or child process
- Returns AI/automation responses to frontend

---------------------------------------------------------------------

## fe_react — Frontend UI

The React interface for interacting with your AI and automation tools.

### Structure
fe_react/
├── src/
│   ├── components/      # Chatbot, dashboards, widgets
│   ├── pages/           # Routes and views
│   ├── App.jsx
│   └── index.js
├── public/
└── package.json

### Development
- Uses React + TailwindCSS
- Connects to backend using Axios
- Displays outputs from the Python AI core

---------------------------------------------------------------------

## Communication Flow

[Frontend React]  →  [Backend Node.js API]  →  [Python AI Core (ai_py)]
                         ↑                            ↓
                   Sends queries                Returns AI responses

This modular design allows each layer to be developed, replaced, or scaled independently.

---------------------------------------------------------------------

## Tech Stack Overview

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | React, Tailwind | Chatbot UI and dashboards |
| Backend | Node.js, Express | API and routing layer |
| AI Core | Python, LangChain, FAISS, Sentence Transformers | Offline RAG and intelligence |
| Database (optional) | MongoDB | Persistent storage (if needed later) |

---------------------------------------------------------------------

## Development Roadmap

| Week | Focus |
|------|-------|
| 1 | AI Core Setup — offline RAG chatbot, LangChain + FAISS |
| 2 | Automation Tools — mini-scripts, API connections |
| 3 | Backend Integration — connect Node to Python |
| 4 | Frontend UI — chatbot interface, dashboard panels |

---------------------------------------------------------------------

## Author

Sayyid Muhammad Al Haddad
AI & Automation Engineer
Independent full-stack and embedded systems developer

---------------------------------------------------------------------

## License

This project is for personal and educational use.
All rights reserved © 2025 Sayyid Muhammad Al Haddad
