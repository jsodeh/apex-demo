
import { useState } from "react";
import { generateMockOrders } from "@/lib/mock-admin";
import { useNavigate } from "react-router-dom";
import { AdminOrder } from "@/types/admin";
import AdminHeader from "@/components/admin/AdminHeader";
import OrdersTable from "@/components/admin/OrdersTable";
import CreateOrderDialog from "@/components/admin/CreateOrderDialog";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(generateMockOrders());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewOrder = (trackingId: string) => {
    navigate(`/tracking/${trackingId}`);
  };

  const handleCreateOrder = (newOrder: AdminOrder) => {
    setOrders([newOrder, ...orders]);
    toast({
      title: "Order created successfully",
      description: `Tracking ID: ${newOrder.trackingId}`,
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="container py-8">
      <AdminHeader onCreateOrder={() => setIsCreateDialogOpen(true)} />
      <OrdersTable orders={orders} onViewOrder={handleViewOrder} />
      <CreateOrderDialog 
        open={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateOrder={handleCreateOrder}
      />
    </div>
  );
};

export default AdminPage;
