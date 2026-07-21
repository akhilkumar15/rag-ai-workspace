import faiss
import numpy as np


class VectorDatabase:

    def __init__(self, dimension):

        self.dimension = dimension
        
    def create_index(self):

        self.index = faiss.IndexFlatL2(self.dimension)

        print("FAISS index created successfully.")
        
    def add_embeddings(self, embeddings):

        self.index.add(embeddings)

        print(f"{len(embeddings)} embeddings added to FAISS index.")
        
    def save_index(self, index_path):

        faiss.write_index(self.index, index_path)

        print(f"FAISS index saved to {index_path}")
        
    def load_index(self, index_path):

        self.index = faiss.read_index(index_path)

        print(f"FAISS index loaded from {index_path}")
        
    def search(self, query_embedding, k):

        distances, indices = self.index.search(query_embedding, k)

        return distances, indices