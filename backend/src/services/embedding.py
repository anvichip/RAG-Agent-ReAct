from langchain_chroma import Chroma
from pathlib import Path
from langchain_huggingface.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
# vectorstore = Chroma.from_texts(
#     texts=chunks,
#     embedding=embeddings,
#     persist_directory="chroma_db"
# )

# # vectorstore.persist()
# print("Vector store saved to 'chroma_db'")


# def update_vector_store(new_chunks: list[str]):
#     """Update the vector store with new text chunks."""
#     global vectorstore
#     vectorstore.add_texts(new_chunks)
#     vectorstore.persist()
#     print(f"Added {len(new_chunks)} new chunks to the vector store.")

from datetime import datetime, timezone

def update_vector_store(new_chunks: list[str], pdf_filename: str):
    """Update vector store with new chunks + metadata."""
    global vectorstore
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
    vectorstore.add_texts(
        texts=new_chunks,
        metadatas=metadatas
    )
    # ⚠️ remove persist() if your Chroma version doesn't support it
    # vectorstore.persist()
    print(f"Added {len(new_chunks)} new chunks from {pdf_filename} to the vector store.")


DB_DIR = "chroma_db"
def load_vectorstore():
    # If DB exists, load; else, create empty
    if Path(DB_DIR).exists():
        vectorstore = Chroma(persist_directory=DB_DIR, embedding_function=embeddings)
    else:
        vectorstore = Chroma.from_texts([], embedding=embeddings, persist_directory=DB_DIR)
    return vectorstore

def remove_pdf(filename: str):
    vectorstore = load_vectorstore()

    # Delete by metadata
    vectorstore.delete(where={"source_pdf": filename})
    vectorstore.persist()
    print(f"Removed chunks from {filename}")


## usage: vectorstore = load_vectorstore()