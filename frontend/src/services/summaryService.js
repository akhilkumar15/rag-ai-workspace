import api from "./api";

export async function summarizeDocument(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/summarize",
    formData,
    {
      headers: {
        "Content-Type": undefined,
      },
      timeout: 120000,
    }
  );

  return response.data;
}