import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);

    const handleLogout = async () => {
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {

        if (!token) {
            handleLogout();
        }
    }, [dispatch, token, navigate, handleLogout]);

    return children;
}

export default ProtectedRoute;