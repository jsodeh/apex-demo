
import React from "react";
import { Control } from "react-hook-form";
import { UpdateStatusFormSchema } from "../schemas/update-status-schema";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface OnHoldReasonFieldProps {
  control: Control<UpdateStatusFormSchema>;
}

const OnHoldReasonField = ({ control }: OnHoldReasonFieldProps) => {
  return (
    <FormField
      control={control}
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
  );
};

export default OnHoldReasonField;
