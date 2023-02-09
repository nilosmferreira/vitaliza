import { api } from '@/infra/axios';
import { AxiosError } from 'axios';
import { decode } from 'jsonwebtoken';
import Router from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type UserData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  avatar?: string;
};
type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  user: UserData | undefined;
};
export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}
export const useAuth = () => {
  return useContext(AuthContext);
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'vitaliza.token': token } = parseCookies();
    if (token) {
      api
        .get<UserData>('/api/controle/usuario/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {});
    }
  }, []);
  const signIn = async (username: string, password: string) => {
    try {
      const { data } = await api.post('/api/signin', {
        username,
        password,
      });
      const { token } = data;

      setCookie(undefined, 'vitaliza.token', token, {
        maxAge: 60 * 60 * 1, // 1 hora
      });
      const decoded = decode(token, {
        json: true,
      }) as UserData;
      setUser(decoded);

      Router.push('/controle');
    } catch (error) {
      console.log('error', error);
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      else if (error instanceof Error) throw new Error(error.message);
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
