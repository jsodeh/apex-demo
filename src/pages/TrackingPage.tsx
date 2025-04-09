
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrackingInfo } from "@/types/tracking";
import { getStoredOrders } from "@/lib/local-storage";
import { convertOrderToTrackingInfo } from "@/lib/tracking-utils";

import TrackingHeader from "@/components/tracking/TrackingHeader";
import ShipmentStatusCard from "@/components/tracking/ShipmentStatusCard";
import ServiceInformation from "@/components/tracking/ServiceInformation";
import TrackingEvents from "@/components/tracking/TrackingEvents";
import TrackAnotherPackage from "@/components/tracking/TrackAnotherPackage";
import LoadingState from "@/components/tracking/LoadingState";
import NotFoundState from "@/components/tracking/NotFoundState";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const TrackingPage = () => {
  const { trackingId } = useParams<{ trackingId: string }>();
  const navigate = useNavigate();
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to fetch the latest tracking data
  const fetchTrackingData = () => {
    if (!trackingId) return;
    
    setIsLoading(true);
    // Get data from localStorage
    const orders = getStoredOrders();
    
    // Normalize the trackingId for comparison (trim and convert to uppercase)
    const normalizedTrackingId = trackingId.trim().toUpperCase();
    
    console.log(`Searching for tracking ID: ${normalizedTrackingId}`);
    console.log(`Available orders:`, orders.map(o => o.trackingId));
    
    // Log detailed information about each tracking ID for debugging
    orders.forEach(order => {
      console.log(`Order tracking ID: "${order.trackingId}" (${typeof order.trackingId}), length: ${order.trackingId.length}`);
      console.log(`Normalized: "${order.trackingId.trim().toUpperCase()}", length: ${order.trackingId.trim().toUpperCase().length}`);
      console.log(`Comparison result:`, order.trackingId.trim().toUpperCase() === normalizedTrackingId);
    });
    console.log(`Input tracking ID: "${normalizedTrackingId}" (${typeof normalizedTrackingId}), length: ${normalizedTrackingId.length}`);
    
    // Find the order with matching tracking ID (case-insensitive)
    const order = orders.find(o => 
      o.trackingId.trim().toUpperCase() === normalizedTrackingId
    );
    
    if (order) {
      // Convert admin order to tracking info format
      const data = convertOrderToTrackingInfo(order);
      setTrackingInfo(data);
      console.log("Found tracking information:", data);
    } else {
      console.log(`No order found with tracking ID: ${normalizedTrackingId}`);
      setTrackingInfo(null);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    if (!trackingId) {
      navigate("/");
      return;
    }
    
    // Initial fetch
    fetchTrackingData();
    
    // Set up polling to check for updates every 10 seconds
    const intervalId = setInterval(fetchTrackingData, 10000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [trackingId, navigate]);
  
  const handleTrackAnother = (id: string) => {
    // Normalize tracking IDs for comparison
    if (id.trim().toUpperCase() === trackingId?.trim().toUpperCase()) {
      // If trying to track the same ID, refresh the data
      toast.info("Refreshing tracking information");
      fetchTrackingData();
    } else {
      // Otherwise navigate to the new tracking page
      navigate(`/tracking/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <LoadingState />
        </div>
      </div>
    );
  }
  
  if (!trackingInfo) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <NotFoundState trackingId={trackingId} onSubmit={handleTrackAnother} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <TrackingHeader trackingId={trackingInfo.trackingId} />
        
        <ShipmentStatusCard
          status={trackingInfo.status}
          estimatedDelivery={trackingInfo.estimatedDelivery}
          origin={trackingInfo.origin}
          destination={trackingInfo.destination}
          sender={trackingInfo.sender}
          service={trackingInfo.service}
          recipient={trackingInfo.recipient}
          shipmentDate={trackingInfo.shipmentDate}
        />
        
        <ServiceInformation />
        
        <TrackingEvents events={trackingInfo.events} />
        
        <TrackAnotherPackage onSubmit={handleTrackAnother} />

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <p>For any complain contact us at AIL@AIL.COM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
