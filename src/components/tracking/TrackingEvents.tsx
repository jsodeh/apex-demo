
interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  description: string;
  status: string;
}

interface TrackingEventsProps {
  events: TrackingEvent[];
}

const TrackingEvents = ({ events }: TrackingEventsProps) => {
  return (
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
            {events.map((event, index) => (
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
  );
};

export default TrackingEvents;
