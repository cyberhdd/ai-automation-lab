# search.py
import faiss
import pickle
import numpy as np

index = faiss.read_index("embeddings/knowledge.index")
embeddings = pickle.load(open("embeddings/chunks.pkl", "rb"))

query_vector = np.random.rand(384).astype('float32')
D, I = index.search(np.array([query_vector]), k=5)
print(I)
