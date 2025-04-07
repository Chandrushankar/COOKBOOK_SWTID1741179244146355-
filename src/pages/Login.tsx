
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/profile");
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <AuthForm type="login" onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
