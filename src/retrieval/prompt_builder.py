"""
Prompt Builder Module

Builds prompts for different RAG tasks.

Supported Tasks:
- Next Word Prediction
- Question Answering
- Summarization
- Document Comparison
"""

from typing import List, Dict


class PromptBuilder:
    """
    Builds prompts for downstream LLMs.
    """

    def __init__(self) -> None:
        pass

    def _build_context(
        self,
        candidates: List[Dict]
    ) -> str:
        """
        Convert retrieved candidates into a formatted context.
        """

        context_parts = []

        for candidate in candidates:

            context_parts.append(
                f"[Document: {candidate['file_name']} | "
                f"Chunk: {candidate['chunk_id']}]\n"
                f"{candidate['text']}"
            )

        return "\n\n".join(context_parts)

    def build_completion_prompt(
        self,
        user_input: str,
        candidates: List[Dict]
    ) -> str:
        """
        Build prompt for LLM-based text completion.
        """
        context = self._build_context(candidates)

        prompt = f"""
You are an intelligent text completion assistant.

Use the provided context to naturally continue the user's text.

Context:
{context}

User Input:
{user_input}

Complete the sentence naturally without repeating the context.

Assistant:
"""

        return prompt.strip()

    def build_qa_prompt(
        self,
        question: str,
        candidates: List[Dict]
    ) -> str:
        """
        Build prompt for Question Answering.
        """

        context = self._build_context(candidates)

        prompt = f"""
You are an intelligent Question Answering assistant.

Answer ONLY using the provided context.

If the answer is not present, reply:

"I could not find the answer in the provided documents."

Context:
{context}

Question:
{question}

Answer:
"""

        return prompt.strip()

    def build_summary_prompt(
        self,
        candidates: List[Dict]
    ) -> str:
        """
        Build prompt for document summarization.
        """

        context = self._build_context(candidates)

        prompt = f"""
You are a professional summarization assistant.

Summarize the following content into a concise and meaningful summary.

Context:
{context}

Summary:
"""

        return prompt.strip()

    def build_comparison_prompt(
        self,
        document_a: str,
        document_b: str
    ) -> str:
        """
        Build prompt for comparing two documents.
        """

        prompt = f"""
You are a document comparison assistant.

Compare the following documents.

Document A:
{document_a}

Document B:
{document_b}

Provide:

1. Similarities
2. Differences
3. Final Conclusion

Comparison:
"""

        return prompt.strip()