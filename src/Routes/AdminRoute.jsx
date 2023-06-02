import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Pages/Shared/Loader/Loader';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const {isAdmin, isAdminLoading} = useAdmin()
    const location = useLocation()

    if(loading || isAdminLoading){
        return <Loader/>
    }

    if(user && isAdmin){
        return children
    }
    return <Navigate to='/login' state={{from : location}} replace></Navigate>
};

export default AdminRoute;