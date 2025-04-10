
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

interface DescriptionFieldProps {
  control: Control<UpdateStatusFormSchema>;
}

const DescriptionField = ({ control }: DescriptionFieldProps) => {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Update Description</FormLabel>
          <FormControl>
            <Input
              placeholder="e.g. Package arrived at local facility"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionField;
