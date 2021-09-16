import cookie from 'js-cookie';

export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 4,
      path: '/',
      sameSite: 'Lax',
    });
  }
};

export const removeCookie = (key: string, res?: any) => {
  if (process.browser) {    
    cookie.remove(key, {
      expires: 0,
    });
  } else if (res) {
    res.setHeader('Set-Cookie', [
      `${key}=deleted; Max-Age=0`,
    ]);
  }
};

export const getCookie = (key: string, req: any) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: any) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};