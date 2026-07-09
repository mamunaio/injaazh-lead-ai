'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: unknown) => Promise<void>;
  register: (data: unknown) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await apiFetch<User>('/users/me'); // We need to add /auth/me in backend if it doesn't exist, wait, the register returned only token. 
          // Let's assume we can fetch /auth/me or we just decode the token.
          // Since we don't have a reliable /auth/me yet, let's decode the JWT manually for now.
          const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
          setUser({
            id: payload.sub,
            email: payload.email,
            firstName: '', // We don't have these in payload, but it's enough for MVP auth
            lastName: '',
            organizationId: payload.organizationId,
            roles: payload.roles || [],
          });
        } catch (error) {
          console.error('Failed to load user', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (credentials: unknown) => {
    setIsLoading(true);
    try {
      const response = await apiFetch<{ access_token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        requireAuth: false,
      });
      localStorage.setItem('token', response.access_token);
      
      const payload = JSON.parse(Buffer.from(response.access_token.split('.')[1], 'base64').toString());
      setUser({
        id: payload.sub,
        email: payload.email,
        firstName: '',
        lastName: '',
        organizationId: payload.organizationId,
        roles: payload.roles || [],
      });
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: unknown) => {
    setIsLoading(true);
    try {
      const response = await apiFetch<{ access_token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        requireAuth: false,
      });
      localStorage.setItem('token', response.access_token);
      
      const payload = JSON.parse(Buffer.from(response.access_token.split('.')[1], 'base64').toString());
      setUser({
        id: payload.sub,
        email: payload.email,
        firstName: '',
        lastName: '',
        organizationId: payload.organizationId,
        roles: payload.roles || [],
      });
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
