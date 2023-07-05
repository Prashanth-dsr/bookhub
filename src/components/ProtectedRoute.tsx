import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('jwt_token')) {
      navigate("/login");
    }
  }, []);

  return props.children;
};

export default ProtectedRoute;
