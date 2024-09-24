import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const PrivateRoutes = () => {
    const { authTokens } = useContext(AuthContext);
    return authTokens.access ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
