import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const ProtectedRoute = (): JSX.Element => {
    const { isloggedIn } = useAuth();
    console.log(isloggedIn)
    return (
        isloggedIn ? <Outlet /> : <Navigate to="/signin" />
    );
};

export default ProtectedRoute;
