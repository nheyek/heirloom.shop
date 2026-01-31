import { ReactNode } from 'react';
import { useAxiosInterceptor } from './authInterceptor';
import { apiClient } from './apiClient';

interface AuthInterceptorProviderProps {
  children: ReactNode;
}

/**
 * Provider component that sets up axios interceptors for automatic
 * token refresh and re-authentication handling.
 * 
 * Place this high in your component tree, inside Auth0Provider
 * but wrapping your main app content.
 */
export const AuthInterceptorProvider = ({ children }: AuthInterceptorProviderProps) => {
  useAxiosInterceptor(apiClient);
  return <>{children}</>;
};
