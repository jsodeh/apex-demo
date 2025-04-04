
import { AdminOrder } from "@/types/admin";

// Local storage keys
const ORDERS_STORAGE_KEY = "apex_orders";
const USERS_STORAGE_KEY = "apex_users";

// Type for user details
export interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

// Get all orders from localStorage
export const getStoredOrders = (): AdminOrder[] => {
  try {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
  } catch (error) {
    console.error("Error loading orders from localStorage:", error);
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
  const updatedOrders = currentOrders.map(order => 
    order.trackingId === trackingId ? { ...order, ...updates } : order
  );
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

// Initialize with default data if storage is empty
export const initializeLocalStorage = (): void => {
  // Check if orders exist, if not create sample data
  const existingOrders = getStoredOrders();
  if (existingOrders.length === 0) {
    // We'll use the mock data generation for initial data
    // But save it to localStorage for persistence
    import("./mock-admin").then(({ generateMockOrders }) => {
      const mockOrders = generateMockOrders(5);
      saveOrders(mockOrders);
      console.log("Initialized sample order data in localStorage");
    });
  }

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
};
