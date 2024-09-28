import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens, logoutUser } =
        useContext(AuthContext);
    const storageLocation = localStorage.getItem("authTokens")
        ? "localStorage"
        : "sessionStorage";

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` },
    });

    axiosInstance.interceptors.request.use(async (req) => {
        const user = jwtDecode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

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
            logoutUser();
            return req;
        }
    });

    return axiosInstance;
};

export default useAxios;
