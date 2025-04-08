
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
    const order = orders.find(o => o.trackingId === trackingId);
    
    if (order) {
      // Convert admin order to tracking info format
      const data = convertOrderToTrackingInfo(order);
      setTrackingInfo(data);
    } else {
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
    navigate(`/tracking/${id}`);
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
        />
        
        <ServiceInformation />
        
        <TrackingEvents events={trackingInfo.events} />
        
        <TrackAnotherPackage onSubmit={handleTrackAnother} />
      </div>
    </div>
  );
};

export default TrackingPage;
