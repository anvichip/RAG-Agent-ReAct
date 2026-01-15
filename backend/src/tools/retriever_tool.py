# from langchain.tools import tool
from services.vector_store import get_vectorstore


# @tool(response_format="content_and_artifact")
# def retrieve_context(query: str):
#     """Retrieve relevant context from the vector store for a user query."""

#     vectorstore = get_vectorstore()          # <-- lazy singleton
#     retrieved_docs = vectorstore.similarity_search(query, k=2)

#     # nicely serialize docs for LLM
#     serialized = "\n\n".join(
#         f"Source: {doc.metadata}\nContent: {doc.page_content}"
#         for doc in retrieved_docs
#     )

#     # content → what the LLM will read
#     # artifact → raw docs (useful for debugging / apps)
#     return serialized, retrieved_docs


from pydantic import BaseModel, Field
from langchain_core.tools import tool

class RetrieveContextInput(BaseModel):
    query: str = Field(..., description="User question")

@tool(response_format="content_and_artifact", description="Retrieve relevant context from the vector store for a user query.", args_schema=RetrieveContextInput)
def retrieve_context(query: str):
    """Retrieve relevant context from the vector store for a user query."""
    vectorstore = get_vectorstore()
    retrieved_docs = vectorstore.similarity_search(query, k=2)

    serialized = "\n\n".join(
        f"Source: {doc.metadata}\nContent: {doc.page_content}"
        for doc in retrieved_docs
    )
    return serialized, retrieved_docs