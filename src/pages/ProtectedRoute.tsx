import { Outlet, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = (): JSX.Element => {
  const { isloggedIn, loading } = useAuth();

  // If loading, display a loading indicator
  if (loading) {
    return <p>Loading...</p>; // Replace with your loading indicator component
  }

  // If not logged in, redirect to the sign-in page
  if (!isloggedIn) {
    return <Navigate to="/signin" />;
  }

  // If logged in, render the outlet
  return <Outlet />;
};

export default ProtectedRoute;
