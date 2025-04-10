
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminOrder, UpdateStatusFormData } from "@/types/admin";
import { TimelineStatus } from "@/types/tracking";
import { toast } from "sonner";
import { Package } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import UpdateStatusForm from "./update-status/UpdateStatusForm";
import { updateStatusFormSchema, UpdateStatusFormSchema } from "./schemas/update-status-schema";

interface UpdateStatusDialogProps {
  order: AdminOrder | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus: (trackingId: string, data: UpdateStatusFormData) => void;
}

const UpdateStatusDialog = ({
  order,
  open,
  onClose,
  onUpdateStatus,
}: UpdateStatusDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UpdateStatusFormSchema>({
    resolver: zodResolver(updateStatusFormSchema),
    defaultValues: {
      status: (order?.status as TimelineStatus) || "processing",
      location: "",
      description: "",
      onHoldReason: "",
      shipmentDate: order?.shipmentDate ? new Date(order.shipmentDate) : undefined,
    },
  });

  const watchStatus = form.watch("status");
  const isOnHold = watchStatus === "onhold";

  // Reset form when order changes
  useEffect(() => {
    if (order) {
      form.reset({
        status: (order.status as TimelineStatus) || "processing",
        location: order.destination || "",
        description: "",
        onHoldReason: order.onHoldReason || "",
        shipmentDate: order.shipmentDate ? new Date(order.shipmentDate) : undefined,
      });
    }
  }, [order, form]);

  const onSubmit = (data: UpdateStatusFormSchema) => {
    if (!order) {
      toast.error("No order selected");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onUpdateStatus(order.trackingId, data as UpdateStatusFormData);
      
      toast.success("Status updated successfully", {
        description: `${order.trackingId} is now ${data.status}`,
      });
      
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Failed to update status", {
        description: "Please try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Update Status for {order.trackingId}
          </DialogTitle>
          <DialogDescription>
            Update the tracking status for this shipment. This will create a new tracking event.
          </DialogDescription>
        </DialogHeader>

        <UpdateStatusForm
          form={form}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onClose={onClose}
          isOnHold={isOnHold}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusDialog;
