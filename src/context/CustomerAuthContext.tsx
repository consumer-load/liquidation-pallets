'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CustomerProfile {
  email: string;
  name: string;
  company?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface CustomerAuthContextType {
  customer: CustomerProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string, company?: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<CustomerProfile>) => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('amz_customer_session');
      if (saved) {
        setCustomer(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load customer session', e);
    }
  }, []);

  const login = (email: string, name?: string, company?: string) => {
    const profile: CustomerProfile = {
      email,
      name: name || email.split('@')[0],
      company: company || 'Wholesale Buyer LLC',
    };
    setCustomer(profile);
    try {
      localStorage.setItem('amz_customer_session', JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save customer session', e);
    }
  };

  const logout = () => {
    setCustomer(null);
    try {
      localStorage.removeItem('amz_customer_session');
    } catch (e) {
      console.error('Failed to clear customer session', e);
    }
  };

  const updateProfile = (profile: Partial<CustomerProfile>) => {
    if (!customer) return;
    const updated = { ...customer, ...profile };
    setCustomer(updated);
    try {
      localStorage.setItem('amz_customer_session', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update customer session', e);
    }
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        isLoggedIn: !!customer,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
}
