
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Globe, Shield, Lock, Database } from "lucide-react";
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
      <section className="relative bg-black">
        <div className="hero-pattern py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                <span className="text-apex-gold">SECURE</span> LOGISTICS & <span className="text-apex-secondary">VAULT</span> SERVICES
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                Track your shipments worldwide with APEX INTERNATIONAL LOGISTICS - your reliable partner in global shipping and secure vault storage solutions.
              </p>
              
              <div className="bg-black border border-apex-gold/30 vault-glow p-6 rounded-lg shadow-lg">
                <TrackingForm onSubmit={handleTrack} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16 fill-apex-accent">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-apex-accent">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">Our Services</h2>
          <p className="text-center mb-12 text-gray-400 max-w-3xl mx-auto">
            Providing secure vault storage and reliable global logistics with advanced security measures for your valuable assets
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none bg-black/70 shadow-md hover:shadow-xl transition-shadow hover:border-apex-gold/30 vault-glow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-apex-DEFAULT/10 rounded-full">
                    <Lock className="h-8 w-8 text-apex-gold" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-white">Private Security Vaults</h3>
                <p className="text-center text-gray-400">
                  State-of-the-art secure storage facilities with biometric access control and 24/7 monitoring.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-black/70 shadow-md hover:shadow-xl transition-shadow hover:border-apex-gold/30 vault-glow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-apex-DEFAULT/10 rounded-full">
                    <Truck className="h-8 w-8 text-apex-DEFAULT" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-white">Secure Freight Services</h3>
                <p className="text-center text-gray-400">
                  Armored shipping by air, ocean, and land with real-time tracking and advanced security protocols.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-black/70 shadow-md hover:shadow-xl transition-shadow hover:border-apex-gold/30 vault-glow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-apex-DEFAULT/10 rounded-full">
                    <Shield className="h-8 w-8 text-apex-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-white">High-Value Asset Protection</h3>
                <p className="text-center text-gray-400">
                  Specialized security measures for valuable goods with insurance coverage and risk management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Security Features */}
      <section className="py-16 security-gradient">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Advanced Security Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black/50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-apex-gold/10 rounded-full">
                  <Database className="h-6 w-6 text-apex-gold" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-white">Blockchain Tracking</h3>
              <p className="text-center text-gray-300">Immutable record of shipment movements</p>
            </div>
            
            <div className="bg-black/50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-apex-secondary/10 rounded-full">
                  <Lock className="h-6 w-6 text-apex-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-white">Biometric Access</h3>
              <p className="text-center text-gray-300">Multi-factor authentication systems</p>
            </div>
            
            <div className="bg-black/50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-apex-DEFAULT/10 rounded-full">
                  <Shield className="h-6 w-6 text-apex-DEFAULT" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-white">24/7 Armed Guards</h3>
              <p className="text-center text-gray-300">Professional security personnel</p>
            </div>
            
            <div className="bg-black/50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-apex-gold/10 rounded-full">
                  <Globe className="h-6 w-6 text-apex-gold" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-white">Global Monitoring</h3>
              <p className="text-center text-gray-300">Real-time surveillance systems</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Assets with Apex?</h2>
            <p className="text-lg mb-8 text-gray-400">
              Join thousands of satisfied customers who trust us with their high-value logistics and security needs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
