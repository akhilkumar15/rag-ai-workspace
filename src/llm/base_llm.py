"""
Base LLM Interface

Defines the contract that every LLM provider
(Ollama, OpenAI, Hugging Face, etc.) must implement.
"""

from abc import ABC, abstractmethod


class BaseLLM(ABC):
    """
    Abstract base class for all LLM providers.
    """

    @abstractmethod
    def generate(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 512,
    ) -> str:
        """
        Generate a response from the language model.

        Parameters
        ----------
        prompt : str
            Prompt sent to the language model.

        temperature : float
            Sampling temperature.

        max_tokens : int
            Maximum number of output tokens.

        Returns
        -------
        str
            Generated response.
        """
        pass