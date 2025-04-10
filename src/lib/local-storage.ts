
import { AdminOrder } from "@/types/admin";

// Local storage keys
const ORDERS_STORAGE_KEY = "apex_orders";
const USERS_STORAGE_KEY = "apex_users";
const ADMIN_CREDENTIALS_KEY = "apex_admin_credentials";

// Type for user details
export interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

// Type for admin credentials
export interface AdminCredential {
  username: string;
  password: string;
  name: string;
  email: string;
}

// Get all orders from localStorage
export const getStoredOrders = (): AdminOrder[] => {
  try {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    
    // If no orders exist yet, generate some mock data
    if (!ordersJson) {
      // Import mock data generator and create initial data
      return initializeOrderData();
    }
    
    return JSON.parse(ordersJson);
  } catch (error) {
    console.error("Error loading orders from localStorage:", error);
    return [];
  }
};

// Initialize order data if none exists
const initializeOrderData = (): AdminOrder[] => {
  try {
    // Import mock generator directly to avoid circular import issues
    // Using require syntax here to avoid circular dependencies
    const { generateMockOrders } = require('./mock-admin');
    const mockOrders = generateMockOrders(5);
    
    // Save to localStorage
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(mockOrders));
    console.log("Initialized sample order data in localStorage");
    
    return mockOrders;
  } catch (error) {
    console.error("Error initializing order data:", error);
    return [];
  }
};

// Save orders to localStorage
export const saveOrders = (orders: AdminOrder[]): void => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Error saving orders to localStorage:", error);
  }
};

// Add a new order and save to localStorage
export const addOrder = (newOrder: AdminOrder): AdminOrder[] => {
  const currentOrders = getStoredOrders();
  const updatedOrders = [newOrder, ...currentOrders];
  saveOrders(updatedOrders);
  return updatedOrders;
};

// Update an existing order
export const updateOrder = (trackingId: string, updates: Partial<AdminOrder>): AdminOrder[] => {
  const currentOrders = getStoredOrders();
  
  // Normalize the trackingId for comparison (to match our tracking page logic)
  const normalizedTrackingId = trackingId.trim().toUpperCase();
  
  const updatedOrders = currentOrders.map(order => {
    const orderTrackingId = order.trackingId.trim().toUpperCase();
    return orderTrackingId === normalizedTrackingId ? { ...order, ...updates } : order;
  });
  
  saveOrders(updatedOrders);
  return updatedOrders;
};

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

// Initialize with default data if storage is empty
export const initializeLocalStorage = (): void => {
  // Clear localStorage to ensure fresh data during development
  // This helps prevent stale data issues
  localStorage.removeItem(ORDERS_STORAGE_KEY);
  
  // Check if orders exist, if not create sample data
  const existingOrders = getStoredOrders();
  
  // Check if users exist, if not create sample data
  const existingUsers = getStoredUsers();
  if (existingUsers.length === 0) {
    const defaultUsers: UserDetails[] = [
      {
        id: "user1",
        name: "Admin User",
        email: "admin@apexshipping.com",
        role: "admin",
        createdAt: new Date().toISOString()
      },
      {
        id: "user2",
        name: "Regular User",
        email: "user@example.com",
        role: "user",
        createdAt: new Date().toISOString()
      }
    ];
    saveUsers(defaultUsers);
    console.log("Initialized sample user data in localStorage");
  }
  
  // Check if admin credentials exist, if not create them
  const existingCredentials = getAdminCredentials();
  if (!existingCredentials) {
    const adminCredentials: AdminCredential = {
      username: "admin",
      password: "apex2025",
      name: "Admin User",
      email: "admin@apexshipping.com"
    };
    saveAdminCredentials(adminCredentials);
    console.log("Initialized admin credentials in localStorage");
  }
};
