from backend.main import app

assert app.title == "RAG AI Workspace API"
assert app.version == "1.1.0"

print("✓ Application loaded successfully.")