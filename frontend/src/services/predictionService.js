import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function predictNextWords(text) {
    const response = await axios.post(
        `${API_BASE_URL}/word-predict`,
        {
            text,
        }
    );

    return response.data;
}