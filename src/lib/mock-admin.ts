
import { AdminOrder } from "@/types/admin";
import { generateMockTrackingData } from "./mock-data";

// Generate a random tracking ID
export const generateTrackingId = () => {
  const prefix = "APX";
  const randomDigits = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${prefix}${randomDigits}`;
};

// Generate mock orders for the admin page
export const generateMockOrders = (count = 10): AdminOrder[] => {
  const orders: AdminOrder[] = [];
  
  const customers = [
    "John Smith", "Jane Doe", "Robert Johnson", "Emily Williams",
    "Michael Brown", "Sarah Davis", "David Miller", "Lisa Wilson",
    "James Moore", "Jennifer Taylor", "Christopher Anderson", "Elizabeth Thomas"
  ];
  
  const statuses = ["ordered", "processing", "intransit", "delivered", "onhold"];
  
  for (let i = 0; i < count; i++) {
    const trackingId = generateTrackingId();
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const isOnHold = status === "onhold";
    
    orders.push({
      id: `order-${i+1}`,
      trackingId,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status,
      origin: ["New York", "Los Angeles", "Chicago", "Miami", "Dallas", "San Francisco", "London", "Tokyo"][Math.floor(Math.random() * 8)],
      destination: ["Seattle", "Boston", "Atlanta", "Denver", "Phoenix", "New Orleans", "Paris", "Berlin"][Math.floor(Math.random() * 8)],
      recipientName: "John Doe",
      recipientAddress: "123 Main St, City, Country",
      onHold: isOnHold,
      onHoldReason: isOnHold ? "Package requires additional documentation" : undefined
    });
  }
  
  // Add specific test orders for tracking
  
  // The problematic tracking ID the user reported
  orders.push({
    id: "order-test-tracking-1",
    trackingId: "APX641275743", // Exact tracking ID from the screenshot
    customerName: "Jennifer Taylor",
    createdAt: new Date().toISOString(),
    status: "ordered",
    origin: "San Antonio, TX",
    destination: "New York, NY",
    recipientName: "Robert Smith",
    recipientAddress: "456 Broadway, New York, NY, 10001",
  });
  
  // The order from the previous example
  orders.push({
    id: "order-test-2",
    trackingId: "APX272265415",
    customerName: "Elizabeth Thomas",
    createdAt: new Date().toISOString(),
    status: "delivered",
    origin: "London, UK",
    destination: "New York, NY",
    recipientName: "Robert Smith",
    recipientAddress: "456 Broadway, New York, NY, 10001",
  });
  
  // Sort orders by creation date (newest first)
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
