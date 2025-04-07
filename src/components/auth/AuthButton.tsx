
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const AuthButton = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Button asChild size="sm" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-colors">
        <Link to="/login">Sign In</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Hello, {user?.id || "User"}</span>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={logout} 
        className="hover:bg-destructive/10 hover:text-destructive"
      >
        Logout
      </Button>
    </div>
  );
};

export default AuthButton;
