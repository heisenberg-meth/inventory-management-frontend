import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, type Tenant, getProfile } from '../data/apiService';

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User, tenant?: Tenant) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ims-token'));
  const [loading, setLoading] = useState(true);

  const login = (newToken: string, newUser: User, newTenant?: Tenant) => {
    setToken(newToken);
    setUser(newUser);
    if (newTenant) setTenant(newTenant);
    localStorage.setItem('ims-token', newToken);
    localStorage.setItem('ims-user', JSON.stringify(newUser));
    if (newTenant) localStorage.setItem('ims-tenant', JSON.stringify(newTenant));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setTenant(null);
    localStorage.removeItem('ims-token');
    localStorage.removeItem('ims-user');
    localStorage.removeItem('ims-tenant');
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const response = await getProfile();
      // getProfile returns { user, tenant } in its data field now based on backend change
      if (response && response.user) {
        const userData = response.user;
        const tenantData = response.tenant || null;
        setUser(userData);
        setTenant(tenantData);
        localStorage.setItem('ims-user', JSON.stringify(userData));
        if (tenantData) localStorage.setItem('ims-tenant', JSON.stringify(tenantData));
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('ims-token');
      const savedUser = localStorage.getItem('ims-user');
      const savedTenant = localStorage.getItem('ims-tenant');

      if (savedToken) {
        setToken(savedToken);
        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedTenant) setTenant(JSON.parse(savedTenant));
        await refreshProfile();
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, tenant, token, loading, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
