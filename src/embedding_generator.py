from sentence_transformers import SentenceTransformer
import numpy as np


class EmbeddingGenerator:

    def __init__(self, model_name="sentence-transformers/all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)

    def generate_embeddings(self, chunks):

        embeddings = self.model.encode(
            chunks,
            batch_size=64,
            show_progress_bar=True,
            convert_to_numpy=True
        )

        return embeddings

    def save_embeddings(self, embeddings, output_path):

        np.save(output_path, embeddings)

        print(f"Embeddings saved to {output_path}")

    def load_embeddings(self, input_path):

        embeddings = np.load(input_path)

        print(f"Embeddings loaded from {input_path}")

        return embeddings