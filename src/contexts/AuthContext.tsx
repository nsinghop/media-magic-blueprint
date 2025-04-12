
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SocialPlatform } from '@/components/common/ContentCard';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface ConnectedPlatform {
  id: string;
  platform: SocialPlatform;
  username: string;
  connected: boolean;
  tokenExpiry?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  connectedPlatforms: ConnectedPlatform[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  connectPlatform: (platform: SocialPlatform) => Promise<boolean>;
  disconnectPlatform: (platformId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectedPlatforms, setConnectedPlatforms] = useState<ConnectedPlatform[]>([]);

  // Simulate loading user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('socialbox_user');
    const storedPlatforms = localStorage.getItem('socialbox_platforms');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (storedPlatforms) {
        setConnectedPlatforms(JSON.parse(storedPlatforms));
      }
    }
    
    setIsLoading(false);
  }, []);

  // Save user and platforms to local storage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('socialbox_user', JSON.stringify(user));
      localStorage.setItem('socialbox_platforms', JSON.stringify(connectedPlatforms));
    } else {
      localStorage.removeItem('socialbox_user');
      localStorage.removeItem('socialbox_platforms');
    }
  }, [user, connectedPlatforms]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'
      };
      
      setUser(mockUser);
      toast({
        title: "Login successful",
        description: "Welcome back to SocialBox!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setConnectedPlatforms([]);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const connectPlatform = async (platform: SocialPlatform) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if platform is already connected
      const existingPlatform = connectedPlatforms.find(p => p.platform === platform);
      if (existingPlatform) {
        toast({
          title: "Already connected",
          description: `Your ${platform} account is already connected`,
        });
        setIsLoading(false);
        return false;
      }
      
      // Mock connected platform
      const newPlatform: ConnectedPlatform = {
        id: `${platform}-${Date.now()}`,
        platform: platform,
        username: platform === 'facebook' ? 'SocialBox Page' : 
                 platform === 'twitter' ? '@SocialBoxHQ' :
                 platform === 'instagram' ? '@socialbox_official' : 'SocialBox',
        connected: true,
        tokenExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      setConnectedPlatforms([...connectedPlatforms, newPlatform]);
      
      toast({
        title: "Platform connected",
        description: `Your ${platform} account has been connected successfully`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${platform}`,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectPlatform = async (platformId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const platform = connectedPlatforms.find(p => p.id === platformId);
      if (!platform) {
        throw new Error('Platform not found');
      }
      
      setConnectedPlatforms(connectedPlatforms.filter(p => p.id !== platformId));
      
      toast({
        title: "Platform disconnected",
        description: `Your ${platform.platform} account has been disconnected`,
      });
    } catch (error) {
      toast({
        title: "Disconnection failed",
        description: "Failed to disconnect platform",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      connectedPlatforms,
      login,
      logout,
      connectPlatform,
      disconnectPlatform
    }}>
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
