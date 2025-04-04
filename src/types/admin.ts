
import { TrackingInfo } from "./tracking";

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
