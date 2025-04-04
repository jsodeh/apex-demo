
// Mock data generator for shipping tracking
export const generateMockTrackingData = (trackingId: string) => {
  // Get a deterministic number from the tracking ID string
  const hash = trackingId.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Use the hash to determine the shipment status
  const statusOptions = ["ordered", "processing", "intransit", "delivered"] as const;
  const statusIndex = Math.abs(hash) % statusOptions.length;
  const status = statusOptions[statusIndex];
  
  // Generate dates
  const today = new Date();
  const getDateString = (daysOffset: number) => {
    const date = new Date();
    date.setDate(today.getDate() + daysOffset);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };
  
  // Status messages based on status
  const statusMessages = {
    ordered: {
      label: "Order Received",
      date: getDateString(-2),
    },
    processing: {
      label: "Processing at Facility",
      date: getDateString(-1),
    },
    intransit: {
      label: "In Transit",
      date: getDateString(0),
    },
    delivered: {
      label: "Delivered",
      date: getDateString(0),
    },
  };
  
  // Origin and destination cities
  const cities = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
    "London, UK",
    "Paris, France",
    "Tokyo, Japan",
    "Berlin, Germany",
    "Sydney, Australia",
  ];
  
  const originIndex = Math.abs(hash) % cities.length;
  let destinationIndex = (originIndex + Math.floor(Math.abs(hash / 10)) % cities.length) % cities.length;
  
  // Make sure origin and destination are different
  if (originIndex === destinationIndex) {
    destinationIndex = (destinationIndex + 1) % cities.length;
  }
  
  // Generate tracking events
  const events = [];
  
  // Add events based on status
  if (["delivered", "intransit", "processing", "ordered"].includes(status)) {
    events.push({
      date: getDateString(-3),
      time: "10:30 am",
      location: cities[originIndex],
      description: "Order processed",
      status: "processed",
    });
  }
  
  if (["delivered", "intransit", "processing"].includes(status)) {
    events.push({
      date: getDateString(-2),
      time: "2:45 pm",
      location: cities[originIndex],
      description: "Shipment picked up",
      status: "picked_up",
    });
    
    events.push({
      date: getDateString(-2),
      time: "5:15 pm",
      location: cities[originIndex],
      description: "Departed sorting facility",
      status: "departed",
    });
  }
  
  if (["delivered", "intransit"].includes(status)) {
    events.push({
      date: getDateString(-1),
      time: "8:30 am",
      location: `${cities[originIndex].split(",")[0]} International Airport`,
      description: "Processed through facility",
      status: "in_transit",
    });
    
    events.push({
      date: getDateString(-1),
      time: "10:45 am",
      location: "In Transit",
      description: "Shipment in transit",
      status: "in_transit",
    });
  }
  
  if (status === "delivered") {
    events.push({
      date: getDateString(0),
      time: "9:20 am",
      location: cities[destinationIndex],
      description: "Arrived at local facility",
      status: "arrived",
    });
    
    events.push({
      date: getDateString(0),
      time: "11:35 am",
      location: cities[destinationIndex],
      description: "Out for delivery",
      status: "out_for_delivery",
    });
    
    events.push({
      date: getDateString(0),
      time: "2:36 pm",
      location: cities[destinationIndex],
      description: "Delivered",
      status: "delivered",
    });
  }

  // Sort events by date and time (newest first)
  events.sort((a, b) => {
    const dateA = new Date(a.date + " " + a.time);
    const dateB = new Date(b.date + " " + b.time);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Generate delivery estimate date
  const estimatedDelivery = status === "delivered" 
    ? "Delivered" 
    : getDateString(status === "intransit" ? 1 : status === "processing" ? 2 : 3);
  
  return {
    trackingId,
    status: {
      status,
      ...statusMessages[status],
    },
    estimatedDelivery,
    origin: cities[originIndex],
    destination: cities[destinationIndex],
    events,
    sender: {
      name: "APEX International Shipping",
      available: true,
    },
    service: status === "delivered" ? "Signature available" : "APEX Express Shipping",
  };
};
