
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generateMockTrackingData } from "@/lib/mock-data";
import { TrackingInfo } from "@/types/tracking";

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
  
  useEffect(() => {
    if (!trackingId) {
      navigate("/");
      return;
    }
    
    // Simulate API call to fetch tracking data
    setIsLoading(true);
    setTimeout(() => {
      const data = generateMockTrackingData(trackingId);
      setTrackingInfo(data);
      setIsLoading(false);
    }, 1000);
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
