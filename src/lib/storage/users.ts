
import { USERS_STORAGE_KEY } from "./constants";

// Type for user details
export interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

// User related functions
export const getStoredUsers = (): UserDetails[] => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error("Error loading users from localStorage:", error);
    return [];
  }
};

export const saveUsers = (users: UserDetails[]): void => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

export const addUser = (newUser: UserDetails): UserDetails[] => {
  const currentUsers = getStoredUsers();
  const updatedUsers = [newUser, ...currentUsers];
  saveUsers(updatedUsers);
  return updatedUsers;
};
