from langchain_ollama.chat_models import ChatOllama

_llm = None        # singleton instance
_current_model = "llama3.2"


def get_llm():
    global _llm
    if _llm is None:
        _llm = ChatOllama(model=_current_model, temperature=0.0)
    return _llm


def set_model(model_name: str):
    """
    Switch the active LLM. Re-create ONLY if the model changes.
    """
    global _llm, _current_model

    if model_name == _current_model:
        return  # no change, keep current LLM

    _current_model = model_name
    _llm = ChatOllama(model=model_name, temperature=0.0)
