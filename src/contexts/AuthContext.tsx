import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'producer' | 'trader' | 'consumer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profile?: {
    phone?: string;
    location?: string;
    company?: string;
    avatar?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  location?: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock authentication - In production, this would call your API
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'producer@dates.sa',
          name: 'أحمد المزارع',
          role: 'producer',
          profile: { location: 'Al-Ahsa', company: 'مزرعة التمور الذهبية' }
        },
        {
          id: '2',
          email: 'trader@dates.sa', 
          name: 'محمد التاجر',
          role: 'trader',
          profile: { location: 'Riyadh', company: 'شركة تجارة التمور' }
        },
        {
          id: '3',
          email: 'admin@dates.sa',
          name: 'مدير النظام',
          role: 'admin'
        },
        {
          id: '4',
          email: 'consumer@dates.sa',
          name: 'سارة المستهلكة',
          role: 'consumer',
          profile: { location: 'Jeddah' }
        }
      ];

      const mockUser = mockUsers.find(u => u.email === email);
      
      if (mockUser && password === 'password123') {
        const token = `mock-token-${mockUser.id}`;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock registration
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        profile: {
          phone: userData.phone,
          location: userData.location,
          company: userData.company
        }
      };

      const token = `mock-token-${newUser.id}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};