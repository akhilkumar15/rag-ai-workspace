"""
Central configuration for the RAG AI Workspace.
"""

from pathlib import Path
import logging

# =============================================================================
# Project Information
# =============================================================================

PROJECT_NAME: str = "RAG AI Workspace"
PROJECT_VERSION: str = "1.0.0"

# =============================================================================
# Base Paths
# =============================================================================

BASE_DIR: Path = Path(__file__).resolve().parent

DATA_DIR: Path = BASE_DIR / "data"
RAW_DATA_DIR: Path = DATA_DIR / "raw"
PROCESSED_DATA_DIR: Path = DATA_DIR / "processed"

VECTOR_STORE_DIR: Path = BASE_DIR / "vector_store"
LOG_DIR: Path = BASE_DIR / "logs"

# =============================================================================
# Dataset Configuration
# =============================================================================

SUPPORTED_EXTENSIONS: tuple[str, ...] = (
    ".txt",
    ".pdf",
    ".csv",
)

DEFAULT_DATA_DIRECTORY: Path = RAW_DATA_DIR

# =============================================================================
# Chunking Configuration
# =============================================================================

CHUNK_SIZE: int = 500
CHUNK_OVERLAP: int = 100

# =============================================================================
# Embedding Configuration
# =============================================================================

EMBEDDING_MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"

# ==========================
# LLM Configuration
# ==========================

LLM_PROVIDER = "ollama"

# Options:
# "llama3"
# "llama3.2:3b"

LLM_MODEL_NAME = "llama3"

OLLAMA_HOST = "http://localhost:11434"


# =============================================================================
# Retrieval Configuration
# =============================================================================

TOP_K_RESULTS: int = 5
VECTOR_DB_TYPE: str = "faiss"

# =============================================================================
# Logging Configuration
# =============================================================================

LOG_LEVEL: int = logging.INFO

LOG_FORMAT: str = (
    "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)

LOG_FILE: Path = LOG_DIR / "rag_workspace.log"

# =============================================================================
# Directory Initialization
# =============================================================================

REQUIRED_DIRECTORIES = (
    DATA_DIR,
    RAW_DATA_DIR,
    PROCESSED_DATA_DIR,
    VECTOR_STORE_DIR,
    LOG_DIR,
)

for directory in REQUIRED_DIRECTORIES:
    directory.mkdir(parents=True, exist_ok=True)