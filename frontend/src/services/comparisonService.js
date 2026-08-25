import api from "./api";

export async function compareDocuments({
  documentA,
  documentB,
  documentAFile,
  documentBFile,
}) {
  const formData = new FormData();

  // Document A
  if (documentAFile) {
    formData.append("document_a_file", documentAFile);
  } else if (documentA?.trim()) {
    formData.append("document_a", documentA);
  }

  // Document B
  if (documentBFile) {
    formData.append("document_b_file", documentBFile);
  } else if (documentB?.trim()) {
    formData.append("document_b", documentB);
  }

  const response = await api.post(
    "/compare",
    formData
  );

  return response.data;
}