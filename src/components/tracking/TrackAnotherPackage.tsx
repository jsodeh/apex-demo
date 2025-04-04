
import TrackingForm from "@/components/TrackingForm";
import { Card, CardContent } from "@/components/ui/card";

interface TrackAnotherPackageProps {
  onSubmit: (trackingId: string) => void;
}

const TrackAnotherPackage = ({ onSubmit }: TrackAnotherPackageProps) => {
  return (
    <Card className="border-dashed">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Track Another Package</h2>
        <TrackingForm onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
};

export default TrackAnotherPackage;
