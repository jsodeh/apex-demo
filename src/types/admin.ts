
import { TrackingInfo, TimelineStatus } from "./tracking";

export interface AdminOrder {
  id: string;
  trackingId: string;
  customerName: string;
  createdAt: string;
  status: string;
  origin: string;
  destination: string;
  recipientName?: string;
  recipientAddress?: string;
  shipmentDate?: string;
  onHold?: boolean;
  onHoldReason?: string;
}

export interface CreateOrderFormData {
  customerName: string;
  origin: string;
  destination: string;
  service: string;
  recipientName: string; // Added recipientName field
}

export interface UpdateStatusFormData {
  status: TimelineStatus;
  location: string;
  description: string;
  onHoldReason?: string;
  shipmentDate?: Date;
}
