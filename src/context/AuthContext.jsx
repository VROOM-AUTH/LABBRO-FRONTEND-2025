import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
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

    const [error, setError] = useState(null);

    const loginUser = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${baseURL}/token/`, {
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
        } catch (error) {
            setError("Server error. Please try again later.");
        }
    };

    const logoutUser = () => {
        if (authTokens) {
            fetch(`${baseURL}/logout/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens?.access}`,
                },
                body: JSON.stringify({
                    refresh: authTokens?.refresh,
                }),
            })
                .then(() => {
                    // Clear tokens and user;

                    setAuthTokens(null);
                    setUser(null);

                    // Clear tokens from both localStorage and sessionStorage
                    localStorage.removeItem("authTokens");
                    sessionStorage.removeItem("authTokens");

                    setError(null);
                })
                .finally(() => {
                    navigate("/login");
                });
        }
    };

    let contextData = {
        user: user,
        setUser: setUser,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        error: error,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
