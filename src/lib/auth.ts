import { getSession } from '../context/auth';
import { removeCookie } from './cookie';

export async function requirePageAuth(context: any) {
  const session = await getSession(context);

  if (!session) {
    removeCookie('token', context.res);
    context.res.writeHead(307, { Location: '/login' });
    context.res.end();
    return { props: {} };
  }  

  return {
    props: {
      user: session,
    } 
  };
}

export async function requireSameUser(context: any) {
  const session = await getSession(context);

  if (!session || (session.username !== context.query.slug.toLowerCase())) {
    context.res.writeHead(307, { Location: '/login' });
    context.res.end();
    return { props: {} };
  }

  return { 
    props: { 
      user: session,
    }
  };
}
