import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function getProfile(token: string) {
  const response = await axios.get(
    `${API_URL}/api/profile/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}