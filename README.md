# RAG Chatbot (PDF Ingestion + Vector Store)

A Retrieval-Augmented Generation (RAG) chatbot that allows users to upload PDF documents, ingest them into a Chroma vector database, and ask questions grounded on the ingested content.
It specializes in software documentation.
---

## Features

- Upload and ingest PDF files into a vector store
- Chunking + embedding of PDF text
- Vector search + LLM-based answer generation
- Vector store status (indexed document/chunk count)
- List PDFs currently indexed in the vector store
- Delete ingested PDFs from the vector store (API available)

---

## Tech Stack

### Backend
- Python + Flask
- ChromaDB (vector database)
- LangChain (vector store wrapper / retrieval)

### Frontend
- React
- Tailwind CSS

---



