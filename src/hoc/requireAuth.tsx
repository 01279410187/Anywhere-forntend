import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';


const requireAuth = <P extends object>(Component: ComponentType<P>) => {
    const WithAuth: React.FC<P> = (props) => {
        const { isLoggedIn } = useAppSelector((state) => state.auth);
        if (!isLoggedIn) {

            return <Navigate to="/" replace />;
        }
        return <Component {...props} />;
    };

    return WithAuth;
};

export default requireAuth;