
import { Share, Printer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface TrackingHeaderProps {
  trackingId: string;
}

const TrackingHeader = ({ trackingId }: TrackingHeaderProps) => {
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

  return (
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
  );
};

export default TrackingHeader;
