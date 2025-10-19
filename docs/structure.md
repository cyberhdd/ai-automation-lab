# AI Automation Lab - Project Structure

## Python Layer (ai_py/)
Handles ingestion, embeddings, and semantic indexing.
- ingest.py → Entry point for embedding pipeline
- data/ → Raw text or documents
- embeddings/ → Stored FAISS indexes

## Backend (be/)
Handles API endpoints, user auth, and retrieval logic.

## Frontend (fe/)
User-facing React interface connecting to backend endpoints.
