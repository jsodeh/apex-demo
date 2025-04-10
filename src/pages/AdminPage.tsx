
import { useState, useEffect } from "react";
import { AdminOrder, UpdateStatusFormData } from "@/types/admin";
import AdminHeader from "@/components/admin/AdminHeader";
import OrdersTable from "@/components/admin/OrdersTable";
import CreateOrderDialog from "@/components/admin/CreateOrderDialog";
import UpdateStatusDialog from "@/components/admin/UpdateStatusDialog";
import ViewOrderDialog from "@/components/admin/ViewOrderDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  getStoredOrders, 
  addOrder, 
  updateOrder, 
  initializeLocalStorage,
  getAdminCredentials 
} from "@/lib/storage";
import { format } from "date-fns";

const AdminPage = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const { toast } = useToast();
  const [adminCredentials, setAdminCredentials] = useState<any>(null);

  // Initialize data and load orders from localStorage
  useEffect(() => {
    // Initialize localStorage with sample data if empty
    initializeLocalStorage();
    
    // Load orders from localStorage
    const storedOrders = getStoredOrders();
    setOrders(storedOrders);
    
    // Load admin credentials for display
    const credentials = getAdminCredentials();
    setAdminCredentials(credentials);
    
    // Log admin credentials to console for easy access
    if (credentials) {
      console.log("Admin credentials:", {
        username: credentials.username,
        password: credentials.password
      });
    }
  }, []);

  const handleViewOrder = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsViewOrderDialogOpen(true);
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
    // Prepare the update object
    const updates: Partial<AdminOrder> = { 
      status: data.status 
    };
    
    // Add shipment date if provided
    if (data.shipmentDate) {
      updates.shipmentDate = format(data.shipmentDate, "yyyy-MM-dd");
    }
    
    // Add on hold reason if applicable
    if (data.status === "onhold") {
      updates.onHoldReason = data.onHoldReason || "No reason specified";
      updates.onHold = true;
    } else {
      updates.onHoldReason = undefined;
      updates.onHold = false;
    }
    
    // Update the order status in localStorage
    const updatedOrders = updateOrder(trackingId, updates);
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
      
      {adminCredentials && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
          <h3 className="text-amber-800 font-medium mb-2">Admin Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-amber-700">
            <div><span className="font-semibold">Username:</span> {adminCredentials.username}</div>
            <div><span className="font-semibold">Password:</span> {adminCredentials.password}</div>
          </div>
        </div>
      )}
      
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
      
      <ViewOrderDialog
        order={selectedOrder}
        open={isViewOrderDialogOpen}
        onClose={() => {
          setIsViewOrderDialogOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default AdminPage;
