
export type TimelineStatus = "ordered" | "processing" | "intransit" | "delivered";

export interface TrackingStatus {
  status: TimelineStatus;
  label: string;
  date: string;
}

export interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  description: string;
  status: string;
}

export interface Recipient {
  name: string;
  address: string;
}

export interface TrackingInfo {
  trackingId: string;
  status: TrackingStatus;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  events: TrackingEvent[];
  sender: {
    name: string;
    available: boolean;
  };
  service: string;
  recipient?: Recipient;
  shipmentDate?: string;
}
