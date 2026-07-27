"""
RAG AI Workspace

Main entry point for testing all available features.
"""

from src.features.word_predictor import WordPredictor
from src.features.qa_engine import QAEngine
from src.features.summarizer import Summarizer
from src.features.comparator import Comparator


def print_menu():

    print("\n" + "=" * 60)
    print("           RAG AI WORKSPACE")
    print("=" * 60)
    print("1. Word Prediction")
    print("2. Question Answering")
    print("3. Summarization")
    print("4. Compare Two Documents")
    print("0. Exit")
    print("=" * 60)


def main():

    predictor = WordPredictor()
    qa_engine = QAEngine()
    summarizer = Summarizer()
    comparator = Comparator()

    while True:

        print_menu()

        choice = input("Select Option: ").strip()

        if choice == "0":
            print("Exiting...")
            break

        elif choice == "1":

            query = input("\nEnter text: ")

            result = predictor.predict(query)

            print("\nPredictions:\n")

            predictions = result.get("predictions", [])

            if not predictions:
                print("No predictions found.")
            else:
                for index, item in enumerate(predictions, start=1):
                    print(
                        f"{index}. {item['word']} "
                        f"(Frequency: {item['frequency']})"
                    )

        elif choice == "2":

            question = input("\nEnter Question: ")

            result = qa_engine.answer(question)

            print("\nAnswer:\n")
            print(result["response"])

        elif choice == "3":

            query = input("\nEnter Topic: ")

            result = summarizer.summarize(query)

            print("\nSummary:\n")
            print(result["response"])

        elif choice == "4":

            print("\nPaste Document A:")
            document_a = input()

            print("\nPaste Document B:")
            document_b = input()

            result = comparator.compare(
                document_a=document_a,
                document_b=document_b,
            )

            print("\nComparison:\n")
            print(result["response"])

        else:
            print("\nInvalid Option!")


if __name__ == "__main__":
    main()