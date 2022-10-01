import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth);

  return isAuthenticated ? <Outlet/> : <Navigate to='/auth'/>
};

export default ProtectedRoute;
