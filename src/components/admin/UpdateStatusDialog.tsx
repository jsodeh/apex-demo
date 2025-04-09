
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminOrder, UpdateStatusFormData } from "@/types/admin";
import { TimelineStatus } from "@/types/tracking";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Package, SendHorizontal, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  status: z.enum(["ordered", "processing", "intransit", "delivered", "onhold"], {
    required_error: "Please select a status",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters",
  }),
  onHoldReason: z.string().optional(),
  shipmentDate: z.date().optional(),
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

  const onSubmit = (data: UpdateStatusFormData) => {
    if (!order) {
      toast.error("No order selected");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onUpdateStatus(order.trackingId, data);
      
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
                      <SelectItem value="onhold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {isOnHold && (
              <FormField
                control={form.control}
                name="onHoldReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>On Hold Reason</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Explain why the shipment is on hold..." 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="shipmentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Shipment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
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
                {isSubmitting ? "Updating..." : "Send Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusDialog;
