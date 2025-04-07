
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would go here
    setEmail("");
  };

  return (
    <footer className="bg-nav text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-orange-400 font-bold text-xl mb-4">About SB Recipes</h3>
            <p className="text-gray-300 mb-4">
              Discover the joy of cooking with SB Recipes. We bring you carefully curated recipes 
              from around the world, helping you create delicious meals for your family and friends.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-orange-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-orange-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-orange-400">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Recipe Categories */}
          <div>
            <h3 className="text-orange-400 font-bold text-xl mb-4">Recipe Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/search?category=home" className="text-gray-300 hover:text-white">Home</Link>
              <Link to="/search?category=dessert" className="text-gray-300 hover:text-white">Dessert</Link>
              <Link to="/search?category=chicken" className="text-gray-300 hover:text-white">Chicken</Link>
              <Link to="/search?category=goat" className="text-gray-300 hover:text-white">Goat</Link>
              <Link to="/search?category=breakfast" className="text-gray-300 hover:text-white">Breakfast</Link>
              <Link to="/search?category=lamb" className="text-gray-300 hover:text-white">Lamb</Link>
              <Link to="/search?category=pasta" className="text-gray-300 hover:text-white">Pasta</Link>
              <Link to="/search?category=vegan" className="text-gray-300 hover:text-white">Vegan</Link>
              <Link to="/search?category=seafood" className="text-gray-300 hover:text-white">Seafood</Link>
              <Link to="/search?category=side" className="text-gray-300 hover:text-white">Side</Link>
              <Link to="/search?category=starter" className="text-gray-300 hover:text-white">Starter</Link>
              <Link to="/search?category=miscellaneous" className="text-gray-300 hover:text-white">Miscellaneous</Link>
            </div>
          </div>

          {/* Popular Recipes */}
          <div>
            <h3 className="text-orange-400 font-bold text-xl mb-4">Popular Recipes</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recipe/52770" className="text-gray-300 hover:text-white">
                  Classic Pasta Carbonara
                </Link>
              </li>
              <li>
                <Link to="/recipe/52772" className="text-gray-300 hover:text-white">
                  Butter Chicken Curry
                </Link>
              </li>
              <li>
                <Link to="/recipe/52776" className="text-gray-300 hover:text-white">
                  Chocolate Lava Cake
                </Link>
              </li>
              <li>
                <Link to="/recipe/52819" className="text-gray-300 hover:text-white">
                  Mediterranean Greek Salad
                </Link>
              </li>
              <li>
                <Link to="/recipe/52765" className="text-gray-300 hover:text-white">
                  Homemade Sushi Rolls
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-orange-400 font-bold text-xl mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-gray-300 flex items-start">
                <span className="mr-2">📍</span>
                123 Culinary Street, Foodie City, FC 12345
              </p>
              <p className="text-gray-300 flex items-start">
                <span className="mr-2">📞</span>
                +1 (234) 567-890
              </p>
              <p className="text-gray-300 flex items-start">
                <span className="mr-2">📧</span>
                contact@sbrecipes.com
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Subscribe to our Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 SB Recipes - All Rights Reserved
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-400 text-sm hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
