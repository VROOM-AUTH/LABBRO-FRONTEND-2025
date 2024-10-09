import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const useAxios = () => {
    const axiosInstance = axios.create({ baseURL });
    const { authTokens, setUser, setAuthTokens, logoutUser } =
        useContext(AuthContext);
    const storageLocation = localStorage.getItem("authTokens")
        ? "localStorage"
        : "sessionStorage";

    let isRefreshing = false;
    let refreshSubscribers = [];

    // Notify all subscribers with the new access token
    const onRefreshed = (newAccessToken) => {
        refreshSubscribers.map((callback) => callback(newAccessToken));
    };

    // Add the request to the queue, waiting for the refresh
    const subscribeTokenRefresh = (callback) => {
        refreshSubscribers.push(callback);
    };

    axiosInstance.interceptors.request.use(async (req) => {
        let tokens = JSON.parse(
            localStorage.getItem("authTokens") ||
                sessionStorage.getItem("authTokens")
        );

        if (!tokens) {
            logoutUser();
            return req;
        }

        const user = jwtDecode(tokens?.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired || isRefreshing) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((newAccessToken) => {
                        req.headers.Authorization = `Bearer ${newAccessToken}`;
                        resolve(req);
                    });
                });
            }
            req.headers.Authorization = `Bearer ${tokens.access}`;
            return req;
        }

        isRefreshing = true;

        try {
            const { data } = await axios.post(`${baseURL}/token/refresh/`, {
                refresh: tokens.refresh,
            });

            storageLocation === "localStorage"
                ? localStorage.setItem("authTokens", JSON.stringify(data))
                : sessionStorage.setItem("authTokens", JSON.stringify(data));

            setAuthTokens(data);
            setUser(jwtDecode(data.access));

            onRefreshed(data.access);

            req.headers.Authorization = `Bearer ${data.access}`;
            return req;
        } catch (error) {
            console.error("Token refresh failed:", error);
            logoutUser();
        } finally {
            isRefreshing = false;
            refreshSubscribers = [];
        }

        return req;
    });

    return axiosInstance;
};

export default useAxios;
