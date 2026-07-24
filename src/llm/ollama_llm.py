"""
Ollama LLM

Implements the BaseLLM interface using Ollama.
"""

import requests


from src.llm.base_llm import BaseLLM
from config import (
    LLM_MODEL_NAME,
    OLLAMA_HOST,
)


class OllamaLLM(BaseLLM):
    """
    Ollama implementation of BaseLLM.
    """

    def __init__(
        self,
        model: str = LLM_MODEL_NAME,
        host: str = OLLAMA_HOST,
    ) -> None:

        self.model = model
        self.host = host

    def generate(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 512,
    ) -> str:

        url = f"{self.host}/api/generate"

        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens,
            },
        }

        response = requests.post(
            url,
            json=payload,
            timeout=300,
        )

        response.raise_for_status()

        result = response.json()

        return result["response"].strip()