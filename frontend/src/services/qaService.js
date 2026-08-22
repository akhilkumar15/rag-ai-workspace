import api from "./api";

export async function askQuestion(question) {
  const response = await api.post("/qa", {
    question,
  });

  return response.data;
}