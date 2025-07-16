/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useCallback, useState, useContext } from 'react';
import Swal from 'sweetalert2';

export interface IUser {
  name: string;
}

interface AuthState {
  user: IUser;
}

interface SignInCredentials {
  name: string;
}

interface AuthContextData {
  user: IUser;
  signIn(credentials: SignInCredentials): void;
  signOut(): void;
  updateUser(user: IUser): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@Teddy:user');

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(({ name }: SignInCredentials) => {
    try {
      const user = {
        name,
      };

      localStorage.setItem('@Teddy:user', JSON.stringify(user));

      setData({
        user,
      });
    } catch (error) {
      Swal.fire('Opss...', 'Ocorreu um erro tente novamente', 'error');
    }
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@Teddy:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@Teddy:user', JSON.stringify(user));

      setData({
        user,
      });
    },
    [setData]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
