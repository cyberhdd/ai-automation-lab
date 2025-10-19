import faiss
import numpy as np
import pickle
import os

def save_embeddings(embeddings, chunks, path="embeddings"):
    os.makedirs(path, exist_ok=True)
    dimension = len(embeddings[0])
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings).astype("float32"))
    faiss.write_index(index, f"{path}/faiss.index")

    with open(f"{path}/chunks.pkl", "wb") as f:
        pickle.dump(chunks, f)
