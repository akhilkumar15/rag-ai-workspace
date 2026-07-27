"""
Test the complete RAG Word Prediction Pipeline.
"""

from src.pipeline.rag_pipeline import RAGPipeline


def main():

    print("=" * 60)
    print("Loading RAG Pipeline...")
    print("=" * 60)

    pipeline = RAGPipeline()

    print("\nPipeline Loaded Successfully.\n")

    while True:

        query = input("Enter Query (or 'exit'): ").strip()

        if query.lower() == "exit":
            break

        result = pipeline.predict(query)
        
        assert "predictions" in result
        assert isinstance(result["predictions"], list)

        print("\nPredicted Next Words")
        print("-" * 60)

        predictions = result.get("predictions", [])

        if not predictions:
            print("No predictions found.")
            continue

        for index, item in enumerate(predictions, start=1):
            print(
                f"{index}. "
                f"{item['word']} "
                f"(Frequency: {item['frequency']})"
            )

        print()


if __name__ == "__main__":
    main()