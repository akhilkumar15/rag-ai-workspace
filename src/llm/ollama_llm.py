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

    def generate_with_metadata(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 512,
    ) -> dict:
        """
        Generate a response from Ollama and return
        response text together with generation metadata.
        """

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

        return {
            "response": result.get(
                "response",
                "",
            ).strip(),

            "model": result.get(
                "model",
                self.model,
            ),

            "total_duration": result.get(
                "total_duration",
                0,
            ),

            "load_duration": result.get(
                "load_duration",
                0,
            ),

            "prompt_eval_count": result.get(
                "prompt_eval_count",
                0,
            ),

            "prompt_eval_duration": result.get(
                "prompt_eval_duration",
                0,
            ),

            "eval_count": result.get(
                "eval_count",
                0,
            ),

            "eval_duration": result.get(
                "eval_duration",
                0,
            ),
        }