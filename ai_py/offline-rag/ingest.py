import os
import glob
import pickle
import fitz  # PyMuPDF
from langchain.text_splitter import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Paths
DATA_DIR = "data"
EMBEDDING_DIR = "embeddings"
os.makedirs(EMBEDDING_DIR, exist_ok=True)

# Load model
print("🔹 Loading embedding model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def load_texts(data_dir):
    docs = []
    for file in glob.glob(os.path.join(data_dir, "*")):
        if file.endswith(".txt"):
            with open(file, "r", encoding="utf-8") as f:
                docs.append(f.read())
        elif file.endswith(".pdf"):
            with fitz.open(file) as pdf:
                text = ""
                for page in pdf:
                    text += page.get_text()
                docs.append(text)
    return docs

print("🔹 Loading documents...")
texts = load_texts(DATA_DIR)

print("🔹 Splitting documents...")
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
chunks = []
for text in texts:
    chunks.extend(splitter.split_text(text))

print(f"✅ Total chunks: {len(chunks)}")

# Create embeddings
print("🔹 Generating embeddings...")
embeddings = model.encode(chunks, show_progress_bar=True)

# Store embeddings in FAISS
print("🔹 Building FAISS index...")
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))

# Save index + chunks
faiss.write_index(index, os.path.join(EMBEDDING_DIR, "knowledge.index"))
with open(os.path.join(EMBEDDING_DIR, "chunks.pkl"), "wb") as f:
    pickle.dump(chunks, f)

print("✅ Ingestion complete. Knowledgebase saved in /embeddings/")
