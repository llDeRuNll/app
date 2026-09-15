import { httpClient } from "./httpClient";
import type { AuthUser } from "../stores/authStore";

interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

async function register(credentials: AuthCredentials) {
  const { data } = await httpClient.post<AuthResponse>(
    "/auth/register",
    credentials,
  );

  return data;
}

async function login(credentials: AuthCredentials) {
  const { data } = await httpClient.post<AuthResponse>(
    "/auth/login",
    credentials,
  );

  return data;
}

async function logout() {
  await httpClient.post("/auth/logout");
}

export const authService = {
  register,
  login,
  logout,
};
