
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, LogOut } from "lucide-react";
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
          <form onSubmit={handleSearch} className="relative w-40">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search..."
              className="w-full pl-8 rounded-md"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          {isAdminLoggedIn ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/admin">Admin Dashboard</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="default" onClick={() => setLoginDialogOpen(true)}>
              Login
            </Button>
          )}
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
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
            {isAdminLoggedIn ? (
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => {
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
                className="w-full" 
                onClick={() => {
                  setLoginDialogOpen(true);
                  setIsOpen(false);
                }}
              >
                Login
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
