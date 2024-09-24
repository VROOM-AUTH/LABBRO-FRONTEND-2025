import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [authTokens, setAuthTokens] = useState(() => {
        const localTokens = localStorage.getItem("authTokens");
        const sessionTokens = sessionStorage.getItem("authTokens");
        return localTokens
            ? JSON.parse(localTokens)
            : sessionTokens
            ? JSON.parse(sessionTokens)
            : null;
    });

    const [user, setUser] = useState(() => {
        const localTokens = localStorage.getItem("authTokens");
        const sessionTokens = sessionStorage.getItem("authTokens");
        const tokens = localTokens
            ? localTokens
            : sessionTokens
            ? sessionTokens
            : null;
        return tokens ? jwtDecode(tokens) : null;
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        });
        const data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));

            // If "Stay Logged In" is checked, store tokens in localStorage
            if (e.target.stayLoggedIn.checked) {
                localStorage.setItem("authTokens", JSON.stringify(data));
            } else {
                // Otherwise, store tokens in sessionStorage (session will expire when tab/browser is closed)
                sessionStorage.setItem("authTokens", JSON.stringify(data));
            }

            navigate("/");
        } else {
            setError("Username or password is incorrect");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        setError(null);
        navigate("/login");
    };

    const updateToken = async () => {
        const response = await fetch(`${apiUrl}/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));

            // Update storage based on where the token was originally saved
            if (localStorage.getItem("authTokens")) {
                localStorage.setItem("authTokens", JSON.stringify(data));
            } else if (sessionStorage.getItem("authTokens")) {
                sessionStorage.setItem("authTokens", JSON.stringify(data));
            }
        } else {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }
        const fourMinutes = 1000 * 60 * 14;

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    let contextData = {
        user: user,
        authTokens: authTokens,
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
