import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import InfoProvider from '../context/InfoContext.jsx';

const ProtectedRoute = ({ element }) => {
    const { user } = useAuth();

    return user ? <InfoProvider>{element}</InfoProvider> : <Navigate to="/login" />;
};

export default ProtectedRoute;
