from src.retrieval.retriever import Retriever

print("Loading Retriever...")

retriever = Retriever()

print("Retriever Loaded Successfully.\n")

query = "Artificial Intelligence"

results = retriever.retrieve(query)

assert isinstance(results, list)
assert len(results) > 0

print(f"Query: {query}")
print(f"Retrieved {len(results)} results.\n")

for i, result in enumerate(results, start=1):
    print("=" * 80)
    print(f"Result {i}")
    print(f"Score : {result['score']:.4f}")
    print(f"Source: {result.get('file_name', 'Unknown')}")
    print("-" * 80)
    print(result["text"][:500])
    print()