
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Globe, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import TrackingForm from "@/components/TrackingForm";

const HomePage = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");
  
  const handleTrack = (id: string) => {
    if (!id || id.trim() === "") {
      toast.error("Please enter a valid tracking ID");
      return;
    }
    
    navigate(`/tracking/${id}`);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="hero-pattern bg-cover bg-center py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Global Logistics Solutions You Can Trust
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Track your shipments worldwide with APEX INTERNATIONAL LOGISTICS - your reliable partner in global shipping and logistics.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <TrackingForm onSubmit={handleTrack} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-apex-DEFAULT/10 rounded-full">
                    <Truck className="h-8 w-8 text-apex-DEFAULT" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Freight Services</h3>
                <p className="text-center text-gray-600">
                  Reliable freight shipping by air, ocean, and land with real-time tracking capabilities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-apex-DEFAULT/10 rounded-full">
                    <Globe className="h-8 w-8 text-apex-DEFAULT" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Global Network</h3>
                <p className="text-center text-gray-600">
                  Our extensive global network ensures your cargo reaches its destination on time, every time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-apex-DEFAULT/10 rounded-full">
                    <Shield className="h-8 w-8 text-apex-DEFAULT" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Secure Shipping</h3>
                <p className="text-center text-gray-600">
                  Advanced security measures ensure your valuable items are protected throughout transit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-apex-DEFAULT to-apex-accent text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Ship with Apex?</h2>
            <p className="text-lg mb-8">
              Join thousands of satisfied customers who trust us with their global logistics needs.
            </p>
            <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-apex-DEFAULT">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
