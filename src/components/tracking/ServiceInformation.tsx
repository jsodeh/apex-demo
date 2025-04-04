
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ServiceInformation = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="service-information">
        <AccordionTrigger className="text-lg font-semibold">
          Service Information
        </AccordionTrigger>
        <AccordionContent>
          <p className="mb-4">
            Access detailed information about your delivery and available services.
          </p>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <span>What's an expected delivery?</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>What's a delivery standard?</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>What's a delivery confirmation?</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>How do I sign up for text notifications?</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span>What if my package is missing?</span>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ServiceInformation;
