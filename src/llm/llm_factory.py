"""
LLM Factory

Creates and returns the configured LLM implementation.
"""

from config import LLM_PROVIDER
from src.llm.base_llm import BaseLLM
from src.llm.ollama_llm import OllamaLLM


class LLMFactory:
    """
    Factory class for creating LLM providers.
    """

    @staticmethod
    def get_llm() -> BaseLLM:
        """
        Return the configured LLM instance.

        Returns
        -------
        BaseLLM
            Configured LLM implementation.
        """

        provider = LLM_PROVIDER.lower()

        if provider == "ollama":
            return OllamaLLM()

        raise ValueError(
            f"Unsupported LLM provider: {LLM_PROVIDER}"
        )