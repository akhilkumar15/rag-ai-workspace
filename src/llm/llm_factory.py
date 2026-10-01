"""
LLM Factory

Creates and returns the configured LLM implementation.
"""

from config import LLM_PROVIDER
from src.llm.base_llm import BaseLLM
from src.llm.ollama_llm import OllamaLLM
from src.llm.groq_llm import GroqLLM


class LLMFactory:
    """
    Factory class for creating LLM providers.
    """

    @staticmethod
    def get_llm() -> BaseLLM:
        """
        Return the configured LLM implementation.

        Returns
        -------
        BaseLLM
            Configured LLM implementation.
        """

        provider = LLM_PROVIDER.lower()

        if provider == "ollama":
            return OllamaLLM()

        if provider == "groq":
            return GroqLLM()

        raise ValueError(
            f"Unsupported LLM provider: {LLM_PROVIDER}"
        )