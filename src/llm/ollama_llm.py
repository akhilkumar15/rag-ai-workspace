"""
Ollama LLM

Implements the BaseLLM interface using Ollama.
"""

from __future__ import annotations

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
        self.host = host.rstrip("/")

    # =========================================================
    # BASIC GENERATION
    # =========================================================

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

        try:

            response = requests.post(
                url,
                json=payload,
                timeout=300,
            )

            # -------------------------------------------------
            # Better error reporting
            # -------------------------------------------------

            if not response.ok:

                try:
                    error_data = response.json()
                except Exception:
                    error_data = response.text

                raise RuntimeError(
                    f"Ollama request failed "
                    f"(HTTP {response.status_code}): "
                    f"{error_data}"
                )

            result = response.json()

            generated_text = result.get(
                "response",
                "",
            )

            if not generated_text:
                raise RuntimeError(
                    "Ollama returned an empty response."
                )

            return generated_text.strip()

        except requests.exceptions.ConnectionError as exc:

            raise RuntimeError(
                "Could not connect to Ollama at "
                f"{self.host}. "
                "Make sure Ollama is running."
            ) from exc

        except requests.exceptions.Timeout as exc:

            raise RuntimeError(
                "Ollama request timed out."
            ) from exc

    # =========================================================
    # GENERATION WITH METADATA
    # =========================================================

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

        try:

            response = requests.post(
                url,
                json=payload,
                timeout=300,
            )

            if not response.ok:

                try:
                    error_data = response.json()
                except Exception:
                    error_data = response.text

                raise RuntimeError(
                    f"Ollama request failed "
                    f"(HTTP {response.status_code}): "
                    f"{error_data}"
                )

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

        except requests.exceptions.ConnectionError as exc:

            raise RuntimeError(
                "Could not connect to Ollama at "
                f"{self.host}. "
                "Make sure Ollama is running."
            ) from exc

        except requests.exceptions.Timeout as exc:

            raise RuntimeError(
                "Ollama request timed out."
            ) from exc