from langchain.agents import create_agent
from services.ollama_llm import get_llm
from tools.retriever_tool import retrieve_context

_agent = None 


def get_agent():
    global _agent

    if _agent is None:
        print("Creating new agent instance...")
        tools = [retrieve_context]

        prompt = (
            "You have access to a tool that retrieves context from an technical docuementation of Django. "
            "Use the tool to help answer user queries."
        )
        llm = get_llm()
        print("LLM obtained.")
        _agent = create_agent(llm, tools, system_prompt=prompt)
        print("Agent created.")

    return _agent


def invoke_agent(query: str):
    agent = get_agent()

    final_response = None

    for event in agent.stream(
        {"messages": [{"role": "user", "content": query}]},
        stream_mode="values"
    ):
        final_response = event
        print("Agent event:", event["messages"][-1])
    
    if final_response:
        if "message" in final_response:
            final_response = final_response["message"]
            message_body = final_response.get("content") if final_response else "No response generated."

    return message_body