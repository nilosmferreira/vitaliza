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
  nomeUsuario: string;
  primeiroNome: string;
  ultimoNome: string;
  email: string;
};
type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (usuario: string, senha: string) => Promise<void>;
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
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const signIn = async (usuario: string, senha: string) => {
    try {
      const { data } = await api.post('/api/signin', {
        usuario,
        senha,
      });
      const { token } = data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const decoded = decode(token, {
        json: true,
      }) as UserData;
      setUser(decoded);

      setCookie(undefined, 'vitaliza.token', token, {
        maxAge: 60 * 60 * 1, // 1 hora
      });

      // setIsAuthenticated(true);

      Router.push('/controle');
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
