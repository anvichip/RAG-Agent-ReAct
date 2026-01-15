from pathlib import Path
from langchain_chroma import Chroma
from services.embedding import embeddings
import shutil
from datetime import datetime, timezone

DB_DIR = "chroma_db"
_vectorstore = None   #SINGLETON

def get_vectorstore():
    global _vectorstore
    if _vectorstore is None:
        _vectorstore = Chroma(
            collection_name="pdf_chunks",     # strongly recommended
            persist_directory=DB_DIR,
            embedding_function=embeddings,
        )
    return _vectorstore

# def get_vectorstore():
#     global _vectorstore
#     if _vectorstore is None:
#         if Path(DB_DIR).exists():
#             _vectorstore = Chroma(
#                 persist_directory=DB_DIR,
#                 embedding_function=embeddings,
#             )
#         else:
#             _vectorstore = Chroma.from_texts(
#                 texts=[],
#                 embedding=embeddings,
#                 persist_directory=DB_DIR,
#             )
#     return _vectorstore

def is_vectorstore_empty() -> bool:
    vs = get_vectorstore()
    collection = vs._collection
    return collection.count() == 0

# def update_vector_store(new_chunks: list[str]):
#     vectorstore = get_vectorstore()
#     vectorstore.add_texts(new_chunks)
#     # vectorstore.persist()
#     print(f"Added {len(new_chunks)} new chunks to the vector store.")

def update_vector_store(new_chunks: list[str], pdf_filename: str):
    """Update vector store with new chunks + metadata."""
    global _vectorstore
    if not new_chunks:
        print("No chunks to add.")
        return
    metadatas = [
        {
            "pdf": pdf_filename,
            "chunk_index": i,
            "ingested_at": datetime.now(timezone.utc).isoformat()
        }
        for i in range(len(new_chunks))
    ]
    _vectorstore.add_texts(
        texts=new_chunks,
        metadatas=metadatas
    )
    # ⚠️ remove persist() if your Chroma version doesn't support it
    # vectorstore.persist()
    print(f"Added {len(new_chunks)} new chunks from {pdf_filename} to the vector store.")

def remove_pdf(filename: str):
    vectorstore = get_vectorstore()
    vectorstore.delete(where={"source_pdf": filename})
    vectorstore.persist()
    print(f"Removed chunks from {filename}")

def clear_vectorstore():
    """
    Delete the entire Chroma vector store and reset the singleton.
    """
    global _vectorstore

    # Close current in-memory instance (optional but safe)
    _vectorstore = None

    # Delete the directory on disk if it exists
    if Path(DB_DIR).exists():
        shutil.rmtree(DB_DIR)
        print("Vector store cleared.")
    else:
        print("Vector store was already empty.")