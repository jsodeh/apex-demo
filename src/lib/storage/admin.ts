
import { ADMIN_CREDENTIALS_KEY } from "./constants";

// Type for admin credentials
export interface AdminCredential {
  username: string;
  password: string;
  name: string;
  email: string;
}

// Admin credentials functions
export const getAdminCredentials = (): AdminCredential | null => {
  try {
    const credentialsJson = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    return credentialsJson ? JSON.parse(credentialsJson) : null;
  } catch (error) {
    console.error("Error loading admin credentials from localStorage:", error);
    return null;
  }
};

export const saveAdminCredentials = (credentials: AdminCredential): void => {
  try {
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(credentials));
  } catch (error) {
    console.error("Error saving admin credentials to localStorage:", error);
  }
};
