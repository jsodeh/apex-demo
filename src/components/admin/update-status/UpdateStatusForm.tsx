
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { UpdateStatusFormSchema } from "../schemas/update-status-schema";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import StatusField from "./StatusField";
import OnHoldReasonField from "./OnHoldReasonField";
import ShipmentDateField from "./ShipmentDateField";
import LocationField from "./LocationField";
import DescriptionField from "./DescriptionField";

interface UpdateStatusFormProps {
  form: UseFormReturn<UpdateStatusFormSchema>;
  isSubmitting: boolean;
  onSubmit: (data: UpdateStatusFormSchema) => void;
  onClose: () => void;
  isOnHold: boolean;
}

const UpdateStatusForm = ({
  form,
  isSubmitting,
  onSubmit,
  onClose,
  isOnHold,
}: UpdateStatusFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <StatusField control={form.control} />
        
        {isOnHold && <OnHoldReasonField control={form.control} />}
        
        <ShipmentDateField control={form.control} />
        <LocationField control={form.control} />
        <DescriptionField control={form.control} />

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
  );
};

export default UpdateStatusForm;
