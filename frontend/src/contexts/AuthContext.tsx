import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { tokenStorage } from "@/lib/api";
import { authService } from "@/services/auth.service";
import type { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  /** Check if user has one of the given roles */
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Verify existing token on mount
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    authService
      .verifyToken()
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        }
      })
      .catch(() => {
        tokenStorage.clearTokens();
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<User> => {
      const data = await authService.login(email, password);

      if (data.success) {
        tokenStorage.setTokens(data.accessToken, data.refreshToken);
        setUser(data.user);
        // Pre-fill query cache with the logged-in user
        queryClient.setQueryData(["auth", "user"], data.user);
        return data.user;
      } else {
        throw new Error(data.message || "Login failed");
      }
    },
    [queryClient],
  );

  const logout = useCallback(() => {
    authService.logout().catch(() => {});
    tokenStorage.clearTokens();
    setUser(null);
    // Wipe all cached queries on logout
    queryClient.clear();
  }, [queryClient]);

  const hasRole = useCallback(
    (...roles: UserRole[]): boolean => {
      if (!user) return false;
      return roles.includes(user.userType);
    },
    [user],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
