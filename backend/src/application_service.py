from services.agent import invoke_agent
from services.vector_store import (
    is_vectorstore_empty,
    update_vector_store,
    remove_pdf
)
from services.pdf_parser import process_pdf_to_chunks
from services.ollama_llm import set_model


# -------------------------------------------------------------------
# 1️⃣  ASK QUESTION (Agent / RAG)
# -------------------------------------------------------------------
def ask_question(query: str) -> str:
    """
    Send a user query to the agent.
    """
    print(f"Received question: {query}")
    if is_vectorstore_empty():
        return "The knowledge base is empty. Please ingest documents first."
    else:
        print("Vector store has data — invoking agent.")
    return invoke_agent(query)


# -------------------------------------------------------------------
# 2️⃣  INGEST PDF → VECTOR STORE
# -------------------------------------------------------------------
def ingest_pdf(path: str):
    """
    Parse a PDF and add chunks into the vector store.
    """
    chunks = process_pdf_to_chunks(path)

    # Ensure vectorstore exists + check state
    if is_vectorstore_empty():
        print("Vector store is empty — creating it and adding first documents.")
    else:
        print("Vector store found — appending new chunks.")

    # Add chunks (Chroma will embed them)
    update_vector_store(chunks, pdf_filename=path)

    return {
        "status": "ok",
        "chunks_ingested": len(chunks),
        "file": path,
    }

# -------------------------------------------------------------------
# 3️⃣  REMOVE PDF FROM VECTOR STORE
# -------------------------------------------------------------------
def delete_pdf(filename: str):
    """
    Remove all chunks belonging to a given PDF.
    """
    remove_pdf(filename)
    return {"status": "removed", "file": filename}


# -------------------------------------------------------------------
# 4️⃣  CHANGE MODEL (AND REBUILD AGENT)
# -------------------------------------------------------------------
def change_model(model_name: str):
    """
    Change the active LLM and reset the agent so it rebuilds lazily.
    """

    # Update LLM first
    set_model(model_name)

    # Reset the agent singleton (so next get_agent() rebuilds it)
    from services import agent as agent_module
    agent_module._agent = None   # intentionally reset

    return {"status": "model changed", "model": model_name}
