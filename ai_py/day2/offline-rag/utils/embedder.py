from sentence_transformers import SentenceTransformer

def create_embeddings(chunks, model_name="all-MiniLM-L6-v2"):
    model = SentenceTransformer(model_name)
    embeddings = model.encode(chunks, convert_to_tensor=False)
    return embeddings
