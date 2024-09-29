import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const PrivateRoutes = () => {
    const { user } = useContext(AuthContext);
    return user?.is_staff ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
