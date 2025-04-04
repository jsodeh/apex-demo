
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
  
  for (let i = 0; i < count; i++) {
    const trackingId = generateTrackingId();
    const tracking = generateMockTrackingData(trackingId);
    
    orders.push({
      id: `order-${i+1}`,
      trackingId,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: tracking.status.status,
      origin: tracking.origin,
      destination: tracking.destination,
    });
  }
  
  // Sort orders by creation date (newest first)
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
