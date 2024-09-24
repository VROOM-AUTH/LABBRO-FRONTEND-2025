import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loginUser = async (e) => {
        e.preventDefault();

        const response = await fetch(`${apiUrl}/api/token/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        });

        if (response.ok) {
            navigate("/");
        } else {
            setError("Invalid credentials");
        }
    };

    const logoutUser = () => {
        setError(null);
        navigate("/login");
    };

    const updateToken = async () => {
        const response = await fetch(`${apiUrl}/api/token/refresh/`, {
            method: "POST",
            credentials: "include", // Include refresh_token cookie
        });

        if (response.ok) {
            console.log("Token refreshed successfully");
        } else {
            console.log("Failed to refresh token");
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            // updateToken();
        }
        const fourMinutes = 1000 * 60 * 14;

        const interval = setInterval(() => {
            if (user) {
                // updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    }, [user, loading]);

    let contextData = {
        // user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        error: error,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
