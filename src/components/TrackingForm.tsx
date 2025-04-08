
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TrackingFormProps {
  onSubmit: (trackingId: string) => void;
  defaultValue?: string;
}

const TrackingForm = ({ onSubmit, defaultValue = "" }: TrackingFormProps) => {
  const [trackingId, setTrackingId] = useState(defaultValue);
  
  // Update tracking ID when defaultValue changes
  useEffect(() => {
    if (defaultValue) {
      setTrackingId(defaultValue);
    }
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (trackingId.trim()) {
      onSubmit(trackingId.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tracking-id" className="text-left block font-medium">
          Enter Your Tracking Number
        </Label>
        <div className="flex w-full items-center space-x-2">
          <Input
            id="tracking-id"
            type="text"
            placeholder="e.g., APX123456789"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Search className="h-4 w-4 mr-2" />
            Track
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-left">
        Track your shipment by entering the tracking number provided to you.
      </p>
    </form>
  );
};

export default TrackingForm;
