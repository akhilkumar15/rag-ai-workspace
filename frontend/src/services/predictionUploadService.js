import api from "./api";

export async function uploadPredictionDocument(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/word-predict/upload-document",
    formData
  );

  return response.data;
}