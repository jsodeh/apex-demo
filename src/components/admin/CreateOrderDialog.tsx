
import { useState } from "react";
import { AdminOrder, CreateOrderFormData } from "@/types/admin";
import { generateTrackingId } from "@/lib/mock-admin";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateOrderDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateOrder: (order: AdminOrder) => void;
}

const CreateOrderDialog = ({ open, onClose, onCreateOrder }: CreateOrderDialogProps) => {
  const [formData, setFormData] = useState<CreateOrderFormData>({
    customerName: "",
    origin: "",
    destination: "",
    service: "express",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trackingId = generateTrackingId();
    const newOrder: AdminOrder = {
      id: `order-${Date.now()}`,
      trackingId,
      customerName: formData.customerName,
      createdAt: new Date().toISOString(),
      status: "ordered",
      origin: formData.origin,
      destination: formData.destination,
    };
    
    onCreateOrder(newOrder);
    
    // Reset form
    setFormData({
      customerName: "",
      origin: "",
      destination: "",
      service: "express",
    });
  };

  // Sample cities for select dropdown
  const cities = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "London, UK",
    "Paris, France",
    "Tokyo, Japan",
    "Berlin, Germany",
    "Sydney, Australia",
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                name="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="origin">Origin</Label>
              <Select 
                name="origin"
                value={formData.origin} 
                onValueChange={(value) => handleSelectChange("origin", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select origin city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="destination">Destination</Label>
              <Select 
                name="destination"
                value={formData.destination} 
                onValueChange={(value) => handleSelectChange("destination", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="service">Shipping Service</Label>
              <Select 
                name="service"
                value={formData.service} 
                onValueChange={(value) => handleSelectChange("service", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="express">APEX Express</SelectItem>
                  <SelectItem value="standard">APEX Standard</SelectItem>
                  <SelectItem value="economy">APEX Economy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderDialog;
