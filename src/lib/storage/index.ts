
import { getStoredOrders, findOrderByTrackingId, saveOrders, addOrder, updateOrder } from "./orders";
import { getStoredUsers, saveUsers, addUser, UserDetails } from "./users";
import { getAdminCredentials, saveAdminCredentials, AdminCredential } from "./admin";
import { normalizeTrackingId } from "./utils";
import { ORDERS_STORAGE_KEY, USERS_STORAGE_KEY, ADMIN_CREDENTIALS_KEY } from "./constants";

// Initialize with default data if storage is empty
export const initializeLocalStorage = (): void => {
  // Get existing orders, don't clear them unnecessarily
  // This ensures persistence between page refreshes
  const existingOrdersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!existingOrdersJson) {
    // Only initialize if no orders exist
    const orders = getStoredOrders();
    console.log("Initialized orders:", orders.length);
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

// Export everything for backward compatibility
export {
  getStoredOrders,
  findOrderByTrackingId,
  saveOrders,
  addOrder,
  updateOrder,
  getStoredUsers,
  saveUsers,
  addUser,
  getAdminCredentials,
  saveAdminCredentials,
  normalizeTrackingId,
  type UserDetails,
  type AdminCredential
};
