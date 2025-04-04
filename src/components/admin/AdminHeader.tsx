
import { Button } from "@/components/ui/button";
import { Plus, Truck } from "lucide-react";

interface AdminHeaderProps {
  onCreateOrder: () => void;
}

const AdminHeader = ({ onCreateOrder }: AdminHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground mt-1">
            View, manage, and update shipment orders
          </p>
        </div>
        <Button onClick={onCreateOrder}>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
