
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminOrder, UpdateStatusFormData } from "@/types/admin";
import { TimelineStatus } from "@/types/tracking";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, SendHorizontal } from "lucide-react";

const formSchema = z.object({
  status: z.enum(["ordered", "processing", "intransit", "delivered"], {
    required_error: "Please select a status",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters",
  }),
});

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

  const form = useForm<UpdateStatusFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: (order?.status as TimelineStatus) || "processing",
      location: "",
      description: "",
    },
  });

  // Reset form when order changes
  React.useEffect(() => {
    if (order) {
      form.reset({
        status: (order.status as TimelineStatus) || "processing",
        location: "",
        description: "",
      });
    }
  }, [order, form]);

  const onSubmit = (data: UpdateStatusFormData) => {
    if (!order) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onUpdateStatus(order.trackingId, data);
      setIsSubmitting(false);
      form.reset();
      onClose();
    }, 500);
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipment Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ordered">Ordered</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="intransit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. New York, NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Package arrived at local facility" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="gap-2"
              >
                <SendHorizontal className="h-4 w-4" />
                Send Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusDialog;
