import React from 'react'
import { Navigate } from 'react-router-dom';
import Login from './login';

function PrivateRoute({children}) {
    const token = localStorage.get('token');

    if(!token) {
        return <Navigate to={<Login />} replace />
    }

    return children;
}

export default PrivateRoute