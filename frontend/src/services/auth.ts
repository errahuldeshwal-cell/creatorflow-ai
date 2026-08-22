import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface ProfileUpdateRequest {
  username?: string;
  full_name?: string;
}

export const login = async (data: LoginRequest) => {
  const formData = new URLSearchParams();

  formData.append("username", data.email);
  formData.append("password", data.password);

  const response = await API.post(
    "/api/auth/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (response.data.access_token) {
    localStorage.setItem(
      "access_token",
      response.data.access_token
    );

    document.cookie = `access_token=${response.data.access_token}; path=/; max-age=86400;`;
  }

  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("access_token");

  const response = await API.get(
    "/api/users/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateProfile = async (
  data: ProfileUpdateRequest
) => {
  const token = localStorage.getItem("access_token");

  const response = await API.put(
    "/api/users/profile",
    null,
    {
      params: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const register = async (
  data: RegisterRequest
) => {
  const response = await API.post(
    "/api/auth/register",
    data
  );

  return response.data;
};

/* =====================================
   LOGOUT
===================================== */

export const logout = () => {
  localStorage.removeItem("access_token");

  document.cookie =
    "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
};

export default API;