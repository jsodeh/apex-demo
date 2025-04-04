
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminOrder, UpdateStatusFormData } from "@/types/admin";
import AdminHeader from "@/components/admin/AdminHeader";
import OrdersTable from "@/components/admin/OrdersTable";
import CreateOrderDialog from "@/components/admin/CreateOrderDialog";
import UpdateStatusDialog from "@/components/admin/UpdateStatusDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  getStoredOrders, 
  addOrder, 
  updateOrder, 
  initializeLocalStorage 
} from "@/lib/local-storage";

const AdminPage = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize data and load orders from localStorage
  useEffect(() => {
    // Initialize localStorage with sample data if empty
    initializeLocalStorage();
    
    // Load orders from localStorage
    const storedOrders = getStoredOrders();
    setOrders(storedOrders);
  }, []);

  const handleViewOrder = (trackingId: string) => {
    navigate(`/tracking/${trackingId}`);
  };

  const handleCreateOrder = (newOrder: AdminOrder) => {
    // Add order to localStorage and update state
    const updatedOrders = addOrder(newOrder);
    setOrders(updatedOrders);
    
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
    // Update the order status in localStorage
    const updatedOrders = updateOrder(trackingId, { status: data.status });
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
