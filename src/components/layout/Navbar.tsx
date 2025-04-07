
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Menu, 
  X, 
  User
} from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-nav text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-red-400 text-3xl">🍲</span>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-white text-xl">Recipe</span>
              <span className="font-bold text-white text-xl">Book</span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for recipes..."
                className="w-full bg-[#2a3847] border-none text-white placeholder:text-gray-400 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full text-gray-400"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-orange-300 transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-white hover:text-orange-300 transition-colors">
              Collections
            </Link>
            <Link to="/profile" className="text-white hover:text-orange-300 transition-colors">
              Saved
            </Link>
            <Link to="/categories" className="text-white hover:text-orange-300 transition-colors">
              Food Varieties
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                asChild
                className="border-orange-400 text-orange-400 hover:bg-white hover:text-nav flex items-center gap-2"
              >
                <Link to="/profile">
                  <User className="w-4 h-4" />
                  {user?.username}
                </Link>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                asChild
                className="flex-1 border-orange-400 text-orange-400 hover:bg-white hover:text-nav"
              >
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user?.username}
                </Link>
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              onClick={toggleTheme} 
              className="text-white border border-gray-500 rounded-full px-4"
            >
              Light Mode
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-white"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search for recipes..."
                className="w-full bg-[#2a3847] border-none text-white placeholder:text-gray-400 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full text-gray-400"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
            
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-white hover:text-orange-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                to="/categories" 
                className="text-white hover:text-orange-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              
              <Link 
                to="/profile" 
                className="text-white hover:text-orange-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Saved
              </Link>
              
              <Link 
                to="/categories" 
                className="text-white hover:text-orange-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Food Varieties
              </Link>
              
              <div className="flex gap-2 pt-2">
                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 border-white text-white hover:bg-white hover:text-nav"
                  >
                    <User className="w-4 h-4" />
                    {user?.username}
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="flex-1 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link to="/login" className="flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      Sign In
                    </Link>
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  onClick={toggleTheme} 
                  className="flex-1 text-white border border-gray-500 rounded-full"
                >
                  Light Mode
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
