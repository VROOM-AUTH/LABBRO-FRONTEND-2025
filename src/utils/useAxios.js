import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL,
    });

    // Flag to track if the interceptor is already added
    let interceptorAdded = false;
    const { authTokens, setUser, setAuthTokens, logoutUser } =
        useContext(AuthContext);
    const storageLocation = localStorage.getItem("authTokens")
        ? "localStorage"
        : "sessionStorage";
    let isRefreshing = false;

    // Add interceptor only once
    if (!interceptorAdded) {
        axiosInstance.interceptors.request.use(async (req) => {
            const user = jwtDecode(authTokens?.access);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if (!isExpired || isRefreshing) {
                req.headers.Authorization = `Bearer ${authTokens.access}`;
                return req;
            }

            isRefreshing = true; // Set flag to true to avoid multiple refresh requests

            try {
                const response = await axios.post(`${baseURL}/token/refresh/`, {
                    refresh: authTokens.refresh,
                });

                storageLocation === "localStorage"
                    ? localStorage.setItem(
                          "authTokens",
                          JSON.stringify(response.data)
                      )
                    : sessionStorage.setItem(
                          "authTokens",
                          JSON.stringify(response.data)
                      );

                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));

                req.headers.Authorization = `Bearer ${response.data.access}`;
                return req;
            } catch (error) {
                console.log(error);
                axiosInstance.defaults.headers.Authorization = null;
                logoutUser();
                return req;
            } finally {
                isRefreshing = false; // Reset refreshing flag
            }
        });

        // Set flag to true to avoid adding interceptors again
        interceptorAdded = true;
    }

    return axiosInstance;
};

export default useAxios;
