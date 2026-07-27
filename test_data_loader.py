from src.ingestion.data_loader import DataLoader

loader = DataLoader()

documents = loader.load_all()

assert len(documents) > 0

print(f"✓ Documents Loaded: {len(documents)}")

for document in documents[:10]:
    assert "file_name" in document