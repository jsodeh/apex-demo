
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share, Printer, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TrackingForm from "@/components/TrackingForm";
import { generateMockTrackingData } from "@/lib/mock-data";

interface TrackingStatus {
  status: "ordered" | "processing" | "intransit" | "delivered";
  label: string;
  date: string;
}

interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  description: string;
  status: string;
}

interface TrackingInfo {
  trackingId: string;
  status: TrackingStatus;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  events: TrackingEvent[];
  sender: {
    name: string;
    available: boolean;
  };
  service: string;
}

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
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `APEX Tracking - ${trackingId}`,
        text: `Track your APEX shipment: ${trackingId}`,
        url: window.location.href,
      }).catch(() => {
        // Fallback if share fails
        navigator.clipboard.writeText(window.location.href);
        toast.success("Tracking link copied to clipboard");
      });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Tracking link copied to clipboard");
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const getStatusProgressValue = (status: TrackingStatus["status"]) => {
    switch (status) {
      case "ordered": return 25;
      case "processing": return 50;
      case "intransit": return 75;
      case "delivered": return 100;
      default: return 0;
    }
  };

  const handleTrackAnother = (id: string) => {
    navigate(`/tracking/${id}`);
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!trackingInfo) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Tracking Information Not Found</h1>
          <p className="mb-8">We couldn't find any information for the tracking ID: {trackingId}</p>
          <TrackingForm onSubmit={handleTrackAnother} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Track Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              Track: {trackingId}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
        
        {/* Status Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {trackingInfo.status.label}
                </h2>
                <p className="text-gray-600 mb-4">
                  {trackingInfo.status.date}
                </p>
                
                <div className="mb-6">
                  <Progress 
                    value={getStatusProgressValue(trackingInfo.status.status)} 
                    className="h-2 bg-gray-200"
                  />
                  
                  <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-500">
                    <span>Ordered</span>
                    <span>Processing</span>
                    <span>In Transit</span>
                    <span>Delivered</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">{trackingInfo.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin:</span>
                    <span className="font-medium">{trackingInfo.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination:</span>
                    <span className="font-medium">{trackingInfo.destination}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                <h3 className="font-semibold mb-4">Delivery Information</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-600">Sender:</span>
                    <div className="font-medium">
                      {trackingInfo.sender.available ? 
                        trackingInfo.sender.name : "Unavailable"}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Service Information:</span>
                    <div className="font-medium">
                      {trackingInfo.service}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Service Information */}
        <div className="mb-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="service-information">
              <AccordionTrigger className="text-lg font-semibold">
                Service Information
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  Access detailed information about your delivery and available services.
                </p>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <span>What's an expected delivery?</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span>What's a delivery standard?</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span>What's a delivery confirmation?</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span>How do I sign up for text notifications?</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span>What if my package is missing?</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Latest Updates */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Latest Updates</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Time</th>
                  <th className="text-left py-3 px-4">Progress</th>
                  <th className="text-left py-3 px-4">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {trackingInfo.events.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{event.date}</td>
                    <td className="py-3 px-4">{event.time}</td>
                    <td className="py-3 px-4">{event.description}</td>
                    <td className="py-3 px-4">{event.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Track another package */}
        <Card className="border-dashed">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Track Another Package</h2>
            <TrackingForm onSubmit={handleTrackAnother} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackingPage;
