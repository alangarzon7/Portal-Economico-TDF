'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'reader' | 'researcher' | 'verified_economist';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  institution?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginAsMockRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginAsMockRole: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUser({
      id: 'usr-economist-001',
      email: 'especialista@economiatdf.gob.ar',
      fullName: 'Lic. Martín Benítez',
      role: 'verified_economist',
      institution: 'Instituto de Investigaciones Económicas TDF',
      isVerified: true,
    });
    setLoading(false);
  }, []);

  const loginAsMockRole = (role: UserRole) => {
    const rolesMap: Record<UserRole, UserProfile> = {
      reader: {
        id: 'usr-reader-01',
        email: 'vecino@ushuaia.gob.ar',
        fullName: 'Carolina Rossi',
        role: 'reader',
        isVerified: false,
      },
      researcher: {
        id: 'usr-researcher-02',
        email: 'investigador@untdf.edu.ar',
        fullName: 'Dr. Gustavo Meza',
        role: 'researcher',
        institution: 'Universidad Nacional de Tierra del Fuego (UNTDF)',
        isVerified: false,
      },
      verified_economist: {
        id: 'usr-economist-001',
        email: 'especialista@economiatdf.gob.ar',
        fullName: 'Lic. Martín Benítez',
        role: 'verified_economist',
        institution: 'Instituto de Investigaciones Económicas TDF',
        isVerified: true,
      },
    };
    setUser(rolesMap[role]);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, loginAsMockRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
