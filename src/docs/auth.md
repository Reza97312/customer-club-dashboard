# Authentication & Authorization Architecture

## Overview

The application uses JWT (JSON Web Token) based authentication. Tokens are stored client-side and managed globally through a Zustand state store (`useAuthStore`).

## Authentication Flow

1. Token Acquisition: Upon successful login, the API returns an accessToken.
2. State Storage: The token is persisted in the global auth store (`useAuthStore`) and client local storage.
3. Request Authorization: Requests to protected backend endpoints inject the token via the Authorization HTTP header using the Bearer <token> format.

## Implementation Details

### Auth Store (`useAuthStore`)

Centralized state management using Zustand handles user token sessions:
// Store Access Example
const accessToken = useAuthStore((state) => state.accessToken);

### Authorization Injection in API Requests

Service functions automatically retrieve the active token from the store if no explicit token argument is passed:
import axios from "axios";
import { useAuthStore } from "@/src/features/auth/store/auth.store";

export const fetchLevels = async (token?: string): Promise<LevelsResponse> => {
const activeToken = token || useAuthStore.getState().accessToken;

const response = await axios.get<LevelsResponse>(`${BASE_URL}levels`, {
headers: {
...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
},
});
return response.data;
};

## Handling Unauthorized Responses (401)

- When a 401 Unauthorized status code is returned, it indicates an expired or invalid token.
- The system handles expired sessions by clearing the stored token in useAuthStore and redirecting the user to the login screen.
