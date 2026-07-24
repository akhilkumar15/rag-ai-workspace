"""
Builds the FAISS index for the RAG AI Workspace.
"""

from src.ingestion.data_loader import DataLoader
from src.ingestion.preprocessor import TextPreprocessor
from src.ingestion.tokenizer import Tokenizer
from src.ingestion.chunker import TextChunker
from src.embeddings.embedding_generator import EmbeddingGenerator
from src.embeddings.vector_database import VectorDatabase


def main() -> None:

    print("\n========== RAG AI Workspace ==========\n")

    print("[1/6] Loading documents...")
    loader = DataLoader()
    documents = loader.load_all()
    print(f"Loaded {len(documents)} document(s).\n")

    print("[2/6] Preprocessing...")
    preprocessor = TextPreprocessor()
    documents = preprocessor.preprocess_documents(documents)
    print("Completed.\n")

    print("[3/6] Tokenizing...")
    tokenizer = Tokenizer()
    documents = tokenizer.tokenize_documents(documents)
    print("Completed.\n")

    print("[4/6] Chunking...")
    chunker = TextChunker()
    chunks = chunker.chunk_documents(documents)
    print(f"Generated {len(chunks)} chunk(s).\n")

    print("[5/6] Generating embeddings...")
    generator = EmbeddingGenerator()
    embedded_chunks = generator.generate_embeddings(chunks)
    print("Completed.\n")

    print("[6/6] Building FAISS index...")
    database = VectorDatabase()
    database.build_index(embedded_chunks)
    database.save()
    print("Completed.\n")

    print("======================================")
    print("Index built successfully.")
    print(f"Vectors Stored : {database.total_vectors()}")
    print("======================================\n")


if __name__ == "__main__":
    main()