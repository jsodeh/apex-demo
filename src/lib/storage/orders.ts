
import { AdminOrder } from "@/types/admin";
import { ORDERS_STORAGE_KEY } from "./constants";
import { normalizeTrackingId } from "./utils";

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

// Find an order by tracking ID - case insensitive and trimmed
export const findOrderByTrackingId = (trackingId: string): AdminOrder | undefined => {
  if (!trackingId) return undefined;
  
  const normalizedSearchId = normalizeTrackingId(trackingId);
  const orders = getStoredOrders();
  
  console.log(`Searching for tracking ID: ${normalizedSearchId}`);
  console.log(`Available orders: ${orders.length}`);
  
  // Find order with normalized comparison
  const matchingOrder = orders.find(order => {
    const normalizedOrderId = normalizeTrackingId(order.trackingId);
    return normalizedOrderId === normalizedSearchId;
  });
  
  if (matchingOrder) {
    console.log(`Found matching order: ${matchingOrder.trackingId}`);
  } else {
    console.log('No matching order found');
    console.log('Available tracking IDs:', orders.map(o => o.trackingId));
  }
  
  return matchingOrder;
};

// Initialize order data if none exists
const initializeOrderData = (): AdminOrder[] => {
  try {
    // Import mock generator directly to avoid circular import issues
    // Using require syntax here to avoid circular dependencies
    const { generateMockOrders } = require('../mock-admin');
    const mockOrders = generateMockOrders(5);
    
    // Make sure the order from the screenshot is included
    const hasTestOrder = mockOrders.some(order => 
      normalizeTrackingId(order.trackingId) === 'APX892661570');
      
    if (!hasTestOrder) {
      // Add the specific order from the screenshot
      mockOrders.push({
        id: 'order-special',
        trackingId: 'APX892661570',
        customerName: 'John Smith',
        createdAt: new Date().toISOString(),
        status: 'ordered',
        origin: 'Paris, France',
        destination: 'Berlin, Germany',
        recipientName: 'Mark Dean',
        recipientAddress: '123 Delivery Street, Destination City'
      });
    }
    
    // Save to localStorage
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(mockOrders));
    console.log("Initialized sample order data in localStorage");
    console.log("Orders:", mockOrders.map(o => o.trackingId));
    
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
  
  // Use the normalize function for comparison
  const normalizedTrackingId = normalizeTrackingId(trackingId);
  
  const updatedOrders = currentOrders.map(order => {
    const orderTrackingId = normalizeTrackingId(order.trackingId);
    return orderTrackingId === normalizedTrackingId ? { ...order, ...updates } : order;
  });
  
  saveOrders(updatedOrders);
  return updatedOrders;
};
