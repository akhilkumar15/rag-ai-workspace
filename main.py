from src.data_loader import DataLoader
from src.chunker import TextChunker
from src.embedding_generator import EmbeddingGenerator


INPUT_PATH = "data/raw/wikipedia_dataset"
OUTPUT_PATH = "data/processed/cleaned_text.txt"


def main():
    print("File is executing...")
    
    print("Main started...")

    loader = DataLoader(INPUT_PATH)

    articles = loader.load_data()

    cleaned_articles = loader.preprocess_data(articles)
    
    # Development mode
    cleaned_articles = cleaned_articles[:10]

    loader.save_data(cleaned_articles, OUTPUT_PATH)

    chunker = TextChunker()

    chunks = chunker.chunk_articles(cleaned_articles)

    print(f"Total Chunks: {len(chunks)}")

    embedding_generator = EmbeddingGenerator()

    embeddings = embedding_generator.generate_embeddings(chunks)

    print(f"Embedding Shape: {embeddings.shape}")

    embedding_generator.save_embeddings(
       embeddings,
       "vector_store/embeddings.npy"
    )


if __name__ == "__main__":
    main()