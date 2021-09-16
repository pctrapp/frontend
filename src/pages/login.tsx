import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import router from 'next/router';

import { colors, typography } from '../atoms/constans';
import Anchor from '../components/Anchor';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';
import core from '../core';
import { ALERT } from '../core/events';
import { removeCookie, setCookie } from '../lib/cookie';
import Spinner from '../components/Spinner';
import { checkEmail } from '../lib/validator';
import DefaultHead from '../components/DefaultHead';
import Tooltip from '../lib/tooltip';
import { IUser } from '../types';
import AlreadyLoggedIn from '../components/login/AlreadyLoggedIn';
import Seperator from '../components/Seperator';
import { getSession } from '../context/auth';

interface Props {
  error_message?: string,
  discord_login?: any,
  user?: IUser,
}

const Login: NextPage<Props> = ({ error_message, discord_login, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(user !== undefined);

  useEffect(() => {   
    if (discord_login) {      
      setCookie('token', discord_login.token);
      router.push(`/${discord_login.user.username}`);
    }
    
    if (error_message) {
      router.replace('/login');
      setTimeout(() => {
        if (!user) {
          ALERT.emit({ type: 'error', title: error_message });
        }
      }, 500);
    }
  }, []);

  function redirectToDiscord() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/discord?action=login`);
  }

  function isDisabled() {
    return email === '' || password === '' || password.length < 8 || !checkEmail(email);
  }

  function getTooltipText() {
    if (email === '')
      return 'E-Mail is required';
    if (password === '') 
      return 'Password is required';
    if (!checkEmail(email))
      return 'Invalid E-Mail';
    if (password.length < 8)
      return 'Your password must contain at least 8 characters';
  }

  async function submitHandler(e?: any) {
    e?.preventDefault();

    if (loading) return;
    setLoading(true);

    const response = await core.api.post('auth/login', {
      email,
      password,
    });

    if (response.status === 200) {
      setCookie('token', response.data.token);
      
      router.push((router.query.redirect as string) || `/${response.data.user.username}`);
      return;
    }

    ALERT.emit({ type: 'error', title: response.data.message });
    setLoading(false);
    setPassword('');
  }

  function logoutAndUseDifferent() {
    removeCookie('token');
    setIsLoggedIn(false);
  }

  return (
    <>
      <DefaultHead>
        <title>Welcome back - pctr.app</title>
      </DefaultHead>
      <Wrapper>
        <Box loading={discord_login}>
          {isLoggedIn && user ? 
            <>
              <AlreadyLoggedIn user={user} useDifferent={logoutAndUseDifferent} />
            </>
            :
            <>
            {discord_login 
              ? <Spinner />
              :
              <>
                <typography.h4 align="center">Welcome back</typography.h4>
                <Form onSubmit={submitHandler}>
                  <FormField>
                    <Label htmlFor="email">E-Mail</Label>
                    <Input 
                      type="email" 
                      name="email" 
                      id="email" 
                      onChange={setEmail} 
                      value={email} />
                  </FormField>
                  <FormField>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      type="password" 
                      name="password" 
                      id="password" 
                      onChange={setPassword} 
                      value={password} />
                  </FormField>
                  <Button 
                    margin=".75rem 0 0 0" 
                    data-tip={getTooltipText()}
                    data-for="buttonTooltip"
                    disabled={isDisabled()} 
                    onClick={submitHandler}
                    loading={loading}>Login</Button>
                </Form>
                <Seperator margin=".75rem 0">or</Seperator>
                <DiscordBtn background="#5865F2" onClick={redirectToDiscord}>Discord</DiscordBtn>
                <NoAccount>
                  Need an account?{' '}
                  <Anchor href="/register">Register</Anchor>
                </NoAccount>
              </>
              }
            </>
          }
        </Box>
      </Wrapper>
      <Tooltip id="buttonTooltip" effect="solid" backgroundColor="#000" />
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { code, error_description } = context.query;  

  if (error_description)
    return {
      props: {
        error_message: error_description,
      }
    }

  if (!code) {
    const session = await getSession(context);

    return { props: { user: session ? session : null } };
  }

  const response = await core.api.get(`auth/discord/${code}?action=login`);

  if (response.status === 200) {
    return {
      props: {
        discord_login: {
          ...response.data,
        }
      }
    }
  }

  return {
    props: {
      error_message: response.data.message,
    }
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 2vw;
`;

const Box = styled('div')<{ loading?: boolean }>`
  padding: 3rem 2rem;
  background: ${colors.SEC_BG};
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
  box-shadow: ${colors.BOX_SHADOW};
  min-height: 250px;

  ${({ loading }) => loading && `
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const FormField = styled.div`
  margin-bottom: .8rem;
`;

const DiscordBtn = styled(Button)`
  width: 100%;
`;

const NoAccount = styled(typography.s)`
  margin-top: 1rem;
`;

export default Login;