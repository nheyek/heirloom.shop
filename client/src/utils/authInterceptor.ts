import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useEffect, useRef } from 'react';

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

export const useAxiosInterceptor = (axiosInstance: AxiosInstance) => {
  const { getAccessTokenSilently, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const interceptorIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Only set up interceptor if we're authenticated
    if (!isAuthenticated || isLoading) {
      return;
    }

    // Request interceptor - add token to all requests
    const requestInterceptorId = axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          const token = await getAccessTokenSilently();
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error getting access token:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle 401 errors
    const responseInterceptorId = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // If already refreshing, queue this request
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            // Attempt to refresh the token silently
            const newToken = await getAccessTokenSilently({
              cacheMode: 'off', // Force a refresh
            });

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            processQueue(null, newToken);
            isRefreshing = false;

            // Retry the original request with new token
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            // Token refresh failed - need to re-authenticate
            processQueue(refreshError as Error, null);
            isRefreshing = false;

            // Store the current location to return after login
            const currentPath = window.location.pathname + window.location.search;
            
            // Redirect to login with return URL
            await loginWithRedirect({
              appState: { returnTo: currentPath },
            });

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    interceptorIdRef.current = responseInterceptorId;

    // Cleanup function
    return () => {
      if (requestInterceptorId !== null) {
        axiosInstance.interceptors.request.eject(requestInterceptorId);
      }
      if (responseInterceptorId !== null) {
        axiosInstance.interceptors.response.eject(responseInterceptorId);
      }
    };
  }, [axiosInstance, getAccessTokenSilently, loginWithRedirect, isAuthenticated, isLoading]);
};
