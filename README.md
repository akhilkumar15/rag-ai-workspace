# RAG AI Workspace

A full-stack AI workspace built around Retrieval-Augmented Generation (RAG), semantic retrieval, document intelligence, and word prediction.

The project combines a React + Vite frontend with a FastAPI backend, FAISS vector retrieval, and Sentence Transformers to provide multiple AI-powered tools in a single workspace.

---

## Overview

RAG AI Workspace is designed as a modular AI platform where users can interact with documents and retrieved knowledge through different AI workflows.

The current workspace includes:

- Word Prediction
- Question Answering
- Document Summarization
- Document Comparison
- Retrieval Viewer
- Retrieval History
- Document Upload
- FAISS-based Retrieval

---

## Features

### Word Prediction

Predicts the next possible word from the user's input using retrieved context.

The system focuses on **true next-word prediction** rather than generating complete sentences.

Example:

```text
Input:
Akhil is

Predictions:
a
the
very
not
working