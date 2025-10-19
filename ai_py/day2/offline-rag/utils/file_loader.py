import os
import fitz  # PyMuPDF

def load_pdfs_from_dir(data_dir):
    texts = []
    for file in os.listdir(data_dir):
        if file.endswith(".pdf"):
            with fitz.open(os.path.join(data_dir, file)) as doc:
                text = ""
                for page in doc:
                    text += page.get_text()
                texts.append(text)
    return texts
