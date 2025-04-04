
import { useState } from "react";
import { generateMockOrders } from "@/lib/mock-admin";
import { useNavigate } from "react-router-dom";
import { AdminOrder, UpdateStatusFormData } from "@/types/admin";
import AdminHeader from "@/components/admin/AdminHeader";
import OrdersTable from "@/components/admin/OrdersTable";
import CreateOrderDialog from "@/components/admin/CreateOrderDialog";
import UpdateStatusDialog from "@/components/admin/UpdateStatusDialog";
import { useToast } from "@/hooks/use-toast";
import { generateMockTrackingData } from "@/lib/mock-data";

const AdminPage = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(generateMockOrders());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
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

  const handleUpdateStatusClick = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsUpdateStatusDialogOpen(true);
  };

  const handleUpdateStatus = (trackingId: string, data: UpdateStatusFormData) => {
    // Update the order status in the orders list
    const updatedOrders = orders.map(order => 
      order.trackingId === trackingId 
        ? { ...order, status: data.status }
        : order
    );
    
    setOrders(updatedOrders);
    
    // Show success toast with information
    toast({
      title: "Status updated successfully",
      description: `${trackingId}: ${data.status} - ${data.description}`,
    });
  };

  return (
    <div className="container py-8">
      <AdminHeader onCreateOrder={() => setIsCreateDialogOpen(true)} />
      <OrdersTable 
        orders={orders} 
        onViewOrder={handleViewOrder}
        onUpdateStatus={handleUpdateStatusClick}
      />
      <CreateOrderDialog 
        open={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateOrder={handleCreateOrder}
      />
      <UpdateStatusDialog
        order={selectedOrder}
        open={isUpdateStatusDialogOpen}
        onClose={() => {
          setIsUpdateStatusDialogOpen(false);
          setSelectedOrder(null);
        }}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AdminPage;
