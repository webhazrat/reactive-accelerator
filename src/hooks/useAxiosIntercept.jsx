import { useEffect } from "react";
import { api, apiAuth } from "../api";
import useAuth from "./useAuth";

export default function useAxiosIntercept() {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const requestIntercept = apiAuth.interceptors.request.use(
      (config) => {
        const { authToken } = auth;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = apiAuth.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const { refreshToken } = auth;
          const response = await api.post("/auth/refresh-token", {
            refreshToken,
          });
          const { token } = response.data;

          console.log(`New token : ${token}`);

          setAuth({ ...auth, authToken: token });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiAuth.interceptors.request.eject(requestIntercept);
      apiAuth.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return { apiAuth };
}
