
import { TrackingInfo, TimelineStatus } from "./tracking";

export interface AdminOrder {
  id: string;
  trackingId: string;
  customerName: string;
  createdAt: string;
  status: string;
  origin: string;
  destination: string;
}

export interface CreateOrderFormData {
  customerName: string;
  origin: string;
  destination: string;
  service: string;
}

export interface UpdateStatusFormData {
  status: TimelineStatus;
  location: string;
  description: string;
}
