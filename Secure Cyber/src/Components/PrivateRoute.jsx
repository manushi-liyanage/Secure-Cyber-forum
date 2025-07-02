import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }){
    const token = localStorage.getItem("token");

    //if not token, redirect to login
    if(!token) {
        return <Navigate to="/signin" />
    }

    //else, allow access
    return children
}