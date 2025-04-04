
import TrackingForm from "@/components/TrackingForm";

interface NotFoundStateProps {
  trackingId?: string;
  onSubmit: (trackingId: string) => void;
}

const NotFoundState = ({ trackingId, onSubmit }: NotFoundStateProps) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Tracking Information Not Found</h1>
      <p className="mb-8">
        We couldn't find any information for the tracking ID: {trackingId}
      </p>
      <TrackingForm onSubmit={onSubmit} />
    </div>
  );
};

export default NotFoundState;
