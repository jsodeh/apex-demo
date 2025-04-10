
import * as z from "zod";

export const updateStatusFormSchema = z.object({
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

export type UpdateStatusFormSchema = z.infer<typeof updateStatusFormSchema>;
