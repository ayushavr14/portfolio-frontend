import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = sessionStorage.getItem("ssdd");

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
