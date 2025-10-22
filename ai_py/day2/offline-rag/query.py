import os
import sys
import io # for UTF-8 encoding (emotes)
import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer

# Always use this file's directory as working directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Force stdout to UTF-8 (fix for Windows console encoding)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Check for input
if len(sys.argv) < 2:
    print("Please provide a query, e.g., python query.py 'your question'")
    sys.exit(1)

query = sys.argv[1]
print(f"🔍 Query: {query}")

# --- Paths ---
EMBEDDING_DIR = "embeddings"
FAISS_INDEX_PATH = f"{EMBEDDING_DIR}/faiss.index"
CHUNKS_PATH = f"{EMBEDDING_DIR}/chunks.pkl"

# Load FAISS index
index = faiss.read_index(FAISS_INDEX_PATH)

# Load saved chunks (text)
with open(CHUNKS_PATH, "rb") as f:
    chunks = pickle.load(f)

# === Load embedding model ===
model = SentenceTransformer("all-MiniLM-L6-v2")

# === Encode query ===
query_vector = model.encode([query]).astype("float32")

# === Search ===
k = 3  # number of top results to retrieve
distances, indices = index.search(query_vector, k)


# alternative way 
# Encode query and search
# query_vector = model.encode([query])
# D, I = index.search(np.array(query_vector, dtype=np.float32), 3)

# # Return top results
# print("\n=== Top Matches ===")
# for idx, score in zip(I[0], D[0]):
#     print(f"{store[idx][:150]}... (score: {score:.4f})")


# --- Print results ---
print("\nTop matches:\n")
for i, idx in enumerate(indices[0]):
    distance = distances[0][i]
    score = 1 / (1 + distance)  # convert distance to similarity score
    print(f"Rank {i+1} | Score: {score:.4f} | Distance: {distance:.4f}")
    print(chunks[idx][:500])  # print first 500 chars of matched chunk
    print("-" * 80)
