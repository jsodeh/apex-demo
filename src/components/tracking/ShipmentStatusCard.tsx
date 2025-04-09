
import { Card, CardContent } from "@/components/ui/card";
import TrackingTimeline from "@/components/TrackingTimeline";
import { Calendar, Edit, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TimelineStatus } from "@/types/tracking";

interface TrackingStatus {
  status: TimelineStatus;
  label: string;
  date: string;
}

interface Recipient {
  name: string;
  address: string;
}

interface ShipmentStatusCardProps {
  status: TrackingStatus;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  sender: {
    name: string;
    available: boolean;
  };
  service: string;
  recipient?: Recipient;
  shipmentDate?: string;
  onHold?: boolean;
  onHoldReason?: string;
}

const ShipmentStatusCard = ({
  status,
  estimatedDelivery,
  origin,
  destination,
  sender,
  service,
  recipient,
  shipmentDate,
  onHold,
  onHoldReason
}: ShipmentStatusCardProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    shipmentDate ? new Date(shipmentDate) : undefined
  );

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      toast.success(`Shipment date updated to ${format(date, "MMMM d, yyyy")}`);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {status.label}
            </h2>
            <p className="text-gray-600 mb-4">
              {status.date}
            </p>
            
            {onHold && (
              <Alert variant="warning" className="mb-4 bg-yellow-50 text-yellow-800 border-yellow-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Shipment On Hold</AlertTitle>
                <AlertDescription>
                  {onHoldReason || "This shipment is currently on hold. Please contact customer service for more information."}
                </AlertDescription>
              </Alert>
            )}
            
            <TrackingTimeline currentStatus={status.status} />
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">{estimatedDelivery}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipment Date:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Not specified"}
                  </span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Origin:</span>
                <span className="font-medium">{origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Destination:</span>
                <span className="font-medium">{destination}</span>
              </div>
              
              {recipient && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipient:</span>
                  <div className="text-right">
                    <div className="font-medium">{recipient.name}</div>
                    <div className="text-sm text-gray-600">{recipient.address}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Delivery Information</h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-600">Sender:</span>
                <div className="font-medium">
                  {sender.available ? sender.name : "Unavailable"}
                </div>
              </div>
              
              <div>
                <span className="text-gray-600">Service Information:</span>
                <div className="font-medium">
                  {service}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentStatusCard;
