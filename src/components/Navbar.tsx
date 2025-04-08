
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-heading font-bold text-2xl text-apex-DEFAULT">
              APEX
            </span>
            <span className="font-heading text-lg">INTERNATIONAL LOGISTICS</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-apex-DEFAULT">
            Track
          </Link>
          <div className="relative w-40">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search..."
              className="w-full pl-8 rounded-md"
            />
          </div>
          <Button variant="default" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Track
            </Link>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
              />
            </div>
            <Button variant="default" className="w-full" asChild>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
