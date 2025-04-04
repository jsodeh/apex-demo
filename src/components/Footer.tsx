
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Connect with us</h3>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" asChild>
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Need help?
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Website feedback
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Corporate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Media center
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Investor relations
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-sm text-gray-600 hover:text-apex-DEFAULT">
                  Legal Information
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} APEX INTERNATIONAL LOGISTICS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
