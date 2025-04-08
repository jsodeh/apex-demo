
import TrackingForm from "@/components/TrackingForm";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NotFoundStateProps {
  trackingId?: string;
  onSubmit: (trackingId: string) => void;
}

const NotFoundState = ({ trackingId, onSubmit }: NotFoundStateProps) => {
  return (
    <div className="text-center">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Tracking Information Not Found</AlertTitle>
        <AlertDescription>
          We couldn't find any information for the tracking ID: <span className="font-semibold">{trackingId}</span>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        <div className="bg-black/80 p-6 rounded-lg border border-apex-gold/20">
          <h2 className="text-xl font-bold mb-4">Try Another Tracking Number</h2>
          <p className="text-gray-400 mb-6">
            Please verify your tracking number and try again, or contact customer service for assistance.
          </p>
          <TrackingForm onSubmit={onSubmit} defaultValue={trackingId} />
        </div>
        
        <div className="text-sm text-gray-400">
          <p>Common reasons for tracking information not being found:</p>
          <ul className="list-disc list-inside mt-2 text-left">
            <li>The tracking number was entered incorrectly</li>
            <li>The shipment is too recent and not yet in our system</li>
            <li>The tracking number has expired (over 60 days)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
