import { NextPageContext } from 'next';
import { createContext, createElement, useContext, useEffect, useState } from 'react';

import core from '../core';
import { getCookie, removeCookie } from '../lib/cookie';
import { info } from '../lib/logger';
import { IUser } from '../types';

const sessionContext = createContext<IUser | any>(null);

export function useSession(session?: any) {
  const context = useContext(sessionContext);
  if (context) return context;
  return _useSessionHook(session);
}

function _useSessionHook(session: any) {
  const [data, setData] = useState(session);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    async function _getSession() {
      try {
        const token = getCookie('token', null);

        if (!token) {
          setLoading(false);
          return;
        }

        const user = await _fetchData(token as string);

        setData(user);
        setLoading(false);
      } catch (e: any) {
        console.error('Error in _useSessionHook: ', e.message);
        setLoading(false);
      }
    }

    _getSession();
  }, []);

  function logout() {
    setData(undefined);
    removeCookie('token');
  }

  return [data, loading, logout];
}

export async function getSession(ctx: NextPageContext) {
  const token = getCookie('token', ctx.req);
  if (token) {
    const session = await _fetchData(token);
    return session;
  }
  return null;
}

async function _fetchData(token: string) {
  const response = await core.api
    .with({ options: { headers: { authorization: `Bearer ${token}` } } })
    .get('users/@me');

  if (response.status === 200) {
    info(`Fetching ${response.data.id} --> ${response.data.username}`);

    return response.data;
  }

  return null;
}

export function AuthProvider({ children, session }: any) {
  return createElement(
    sessionContext.Provider,
    { value: useSession(session) },
    children
  );
}