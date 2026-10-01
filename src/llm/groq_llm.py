"""
Groq LLM

Implements the BaseLLM interface using the Groq API.
"""

from __future__ import annotations

import os

from groq import Groq

from src.llm.base_llm import BaseLLM


class GroqLLM(BaseLLM):
    """
    Groq implementation of BaseLLM.
    """

    def __init__(
        self,
        model: str = "openai/gpt-oss-120b",
    ) -> None:

        self.model = model

        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise RuntimeError(
                "GROQ_API_KEY environment variable is not set."
            )

        self.client = Groq(
            api_key=api_key
        )

    # =========================================================
    # BASIC GENERATION
    # =========================================================

    def generate(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 512,
    ) -> str:

        try:

            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                temperature=temperature,
                max_completion_tokens=max_tokens,
                include_reasoning=False,
            )

            generated_text = (
                response.choices[0]
                .message
                .content
            )

            if not generated_text:
                raise RuntimeError(
                    "Groq returned an empty response."
                )

            return generated_text.strip()

        except Exception as exc:

            raise RuntimeError(
                f"Groq request failed: {exc}"
            ) from exc