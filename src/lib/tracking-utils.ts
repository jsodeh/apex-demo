
import { AdminOrder } from "@/types/admin";
import { TrackingInfo, TrackingEvent, TrackingStatus, TimelineStatus } from "@/types/tracking";
import { format, sub } from "date-fns";

// Convert status to display format
export const formatStatus = (status: string): string => {
  switch(status) {
    case "ordered": return "Order Received";
    case "processing": return "Processing at Facility";
    case "intransit": return "In Transit";
    case "delivered": return "Delivered";
    case "onhold": return "On Hold";
    default: return status;
  }
};

// Generate events based on order status
export const generateEventsFromStatus = (order: AdminOrder): TrackingEvent[] => {
  const events: TrackingEvent[] = [];
  const today = new Date();
  
  // Base event time intervals based on status
  const orderDate = new Date(order.createdAt);
  
  // Add ordered event (always present)
  events.push({
    date: format(orderDate, "MMMM d"),
    time: format(orderDate, "h:mm a"),
    location: order.origin,
    description: "Order processed",
    status: "ordered"
  });
  
  // Add processing event
  if (["processing", "intransit", "delivered", "onhold"].includes(order.status)) {
    const processingDate = sub(today, { days: order.status === "delivered" ? 3 : order.status === "intransit" ? 2 : 1 });
    events.push({
      date: format(processingDate, "MMMM d"),
      time: format(processingDate, "h:mm a"),
      location: order.origin,
      description: "Package processed at sorting facility",
      status: "processing"
    });
  }
  
  // Add in transit event
  if (["intransit", "delivered"].includes(order.status)) {
    const transitDate = sub(today, { days: order.status === "delivered" ? 1 : 0 });
    events.push({
      date: format(transitDate, "MMMM d"),
      time: format(transitDate, "h:mm a"),
      location: "In Transit",
      description: "Package in transit to destination",
      status: "intransit"
    });
  }
  
  // Add on hold event
  if (order.status === "onhold") {
    events.push({
      date: format(today, "MMMM d"),
      time: format(today, "h:mm a"),
      location: order.onHoldReason ? "On Hold" : "Processing Facility",
      description: order.onHoldReason || "Shipment on hold",
      status: "onhold"
    });
  }
  
  // Add delivered event
  if (order.status === "delivered") {
    events.push({
      date: format(today, "MMMM d"),
      time: format(today, "h:mm a"),
      location: order.destination,
      description: "Package delivered",
      status: "delivered"
    });
  }
  
  // Sort events by date and time (newest first)
  events.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateB.getTime() - dateA.getTime();
  });
  
  return events;
};

// Convert admin order to tracking info format
export const convertOrderToTrackingInfo = (order: AdminOrder): TrackingInfo => {
  const statusValue = order.status as TimelineStatus;
  
  // Generate estimation based on status
  let estimatedDelivery = "No estimation available";
  if (statusValue === "delivered") {
    estimatedDelivery = "Delivered";
  } else if (statusValue === "onhold") {
    estimatedDelivery = "On Hold - Pending Resolution";
  } else {
    const days = statusValue === "intransit" ? 1 : statusValue === "processing" ? 3 : 5;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + days);
    estimatedDelivery = format(estDate, "MMMM d, yyyy");
  }
  
  // Generate events based on status
  const events = generateEventsFromStatus(order);

  // Set shipment date from order or default (1 day after order creation)
  const shipmentDate = order.shipmentDate || (() => {
    const orderDate = new Date(order.createdAt);
    const shipDate = new Date(orderDate);
    shipDate.setDate(orderDate.getDate() + 1);
    return format(shipDate, "yyyy-MM-dd");
  })();
  
  // Create the tracking info object with recipient information
  return {
    trackingId: order.trackingId,
    status: {
      status: statusValue,
      label: formatStatus(statusValue),
      date: format(new Date(order.createdAt), "MMMM d, yyyy"),
    },
    estimatedDelivery,
    origin: order.origin,
    destination: order.destination,
    events,
    sender: {
      name: "APEX International Logistics",
      available: true,
    },
    service: "APEX Express Shipping",
    // Add recipient information from order or default values
    recipient: {
      name: order.recipientName || "John Doe",
      address: order.recipientAddress || "123 Delivery Street, Destination City"
    },
    // Add shipment date
    shipmentDate,
    // Add on hold information if applicable
    onHold: statusValue === "onhold",
    onHoldReason: order.onHoldReason
  };
};
