
import { Check, Circle } from "lucide-react";

type TimelineStatus = "ordered" | "processing" | "intransit" | "delivered";

interface TimelineItemProps {
  label: string;
  active: boolean;
  completed: boolean;
  isLast?: boolean;
}

interface TrackingTimelineProps {
  currentStatus: TimelineStatus;
}

const TimelineItem = ({ label, active, completed, isLast = false }: TimelineItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 z-10
          ${completed 
            ? "bg-primary text-white border-primary" 
            : active 
              ? "bg-white text-primary border-primary" 
              : "bg-white text-gray-400 border-gray-300"}`}
      >
        {completed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      </div>
      <div className="mt-2 text-xs font-medium text-center">
        <span className={active || completed ? "text-gray-900" : "text-gray-400"}>
          {label}
        </span>
      </div>
      {!isLast && (
        <div 
          className={`absolute h-[2px] w-full top-4 left-1/2 
            ${completed ? "bg-primary" : "bg-gray-300"}`}
        ></div>
      )}
    </div>
  );
};

const TrackingTimeline = ({ currentStatus }: TrackingTimelineProps) => {
  const steps = [
    { id: "ordered", label: "Order" },
    { id: "processing", label: "Processing" },
    { id: "intransit", label: "In Transit" },
    { id: "delivered", label: "Delivered" }
  ];

  const getCurrentStatusIndex = () => {
    return steps.findIndex(step => step.id === currentStatus);
  };

  const currentStatusIndex = getCurrentStatusIndex();

  return (
    <div className="w-full my-6">
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex-1">
            <TimelineItem
              label={step.label}
              active={index === currentStatusIndex}
              completed={index < currentStatusIndex || step.id === currentStatus && step.id === "delivered"}
              isLast={index === steps.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingTimeline;
