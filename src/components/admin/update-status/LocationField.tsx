
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
import { Input } from "@/components/ui/input";

interface LocationFieldProps {
  control: Control<UpdateStatusFormSchema>;
}

const LocationField = ({ control }: LocationFieldProps) => {
  return (
    <FormField
      control={control}
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
  );
};

export default LocationField;
