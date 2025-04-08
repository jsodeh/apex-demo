
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, LogOut, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoginDialog from "@/components/auth/LoginDialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  
  const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/tracking/${searchValue.trim()}`);
      setSearchValue("");
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-apex-gold/20 bg-black backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-heading font-bold text-2xl text-apex-gold">
              APEX
            </span>
            <span className="font-heading text-lg text-white">SECURITY & LOGISTICS</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-gray-300 transition-colors hover:text-apex-gold">
            Track
          </Link>
          <form onSubmit={handleSearch} className="relative w-40">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input 
              type="search"
              placeholder="Search..."
              className="w-full pl-8 rounded-md bg-black/50 border-apex-gold/30 text-white"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          {isAdminLoggedIn ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="border-apex-gold/30 text-apex-gold" asChild>
                <Link to="/admin">Admin Dashboard</Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-apex-secondary" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="default" className="bg-apex-secondary hover:bg-apex-secondary/80" onClick={() => setLoginDialogOpen(true)}>
              <Lock className="h-4 w-4 mr-2" /> Secure Login
            </Button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
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
        <div className="md:hidden border-t border-apex-gold/20 bg-black">
          <div className="container py-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-sm font-medium text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Track
            </Link>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input 
                type="search"
                placeholder="Search..."
                className="w-full pl-8 bg-black/50 border-apex-gold/30 text-white"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
            {isAdminLoggedIn ? (
              <div className="space-y-2">
                <Button variant="outline" className="w-full border-apex-gold/30 text-apex-gold" asChild>
                  <Link to="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                </Button>
                <Button variant="ghost" className="w-full text-apex-secondary" onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                className="w-full bg-apex-secondary hover:bg-apex-secondary/80" 
                onClick={() => {
                  setLoginDialogOpen(true);
                  setIsOpen(false);
                }}
              >
                <Lock className="h-4 w-4 mr-2" /> Secure Login
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Login Dialog */}
      <LoginDialog 
        open={loginDialogOpen} 
        onClose={() => setLoginDialogOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
