import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./customHooks/useAuth.jsx";

function RoutesForUnauthenticated() {
  const { user } = useAuth();
  return !user ? <Outlet/> : <Navigate to='/' />;
}

export default RoutesForUnauthenticated;