import router from 'next/router';
import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { colors, typography } from '../../atoms/constans';
import core from '../../core';
import { ALERT } from '../../core/events';
import { setCookie } from '../../lib/cookie';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import AcceptLegalInfo from './AcceptLegalInfo';
import Tooltip from '../../lib/tooltip';
import UsernameChecker from '../UsernameChecker';
import { sleep } from '../../lib/utils';

interface Props {
  payload: any,
}

const Step2: FC<Props> = ({ payload }) => {
  const [username, setUsername] = useState(payload.username || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validUsername, setValidUsername] = useState<number>(payload.username ? 2 : 0);

  function isDisabled() {
    return password === '' 
      || username === '' 
      || validUsername !== 2 
      || password.length < 8;
  }

  function getTooltipText() {
    if (password === '')
      return 'Password is required';
    if (username === '') 
      return 'Username is required';
    if (password.length < 8) 
      return 'Your password must contain at least 8 characters';
    if (validUsername === 1)
      return 'Username not available or invalid (only a-z and - are allowed)';
  }

  async function onSubmit(e: any): Promise<void> {
    e?.preventDefault();

    if (loading) return;
    setLoading(true);

    if (validUsername !== 2) {
      ALERT.emit({ type: 'error', title: 'Username not available or invalid', message: 'Make sure to use only a-z and - in your username' });
      setLoading(false);
      return;
    }

    const response = await core.api.post('auth/register', {
      username,
      password,
      discord_id: payload.id,
      discriminator: payload.discriminator,
      email: payload.email,
      avatar: payload.avatar,
    });

    if (response.status !== 200) {
      // ERROR
      if (response.data.code === 4001) {
        setValidUsername(1);
      }
      setPassword('');
      ALERT.emit({ title: response.data.message, type: 'error' });
    } else {
      // SUCCESS
      setCookie('token', response.data.token);
      await sleep(500);
      router.push('/getting-started');
    }

    setLoading(false);
  }

  return (
    <>
      <typography.h4 align="center">Finish your Registration</typography.h4>
      <Form onSubmit={onSubmit}>
        <FormField>
          <Label htmlFor="username" margin="0 0 .5rem 0">Username</Label>
          <UsernameChecker 
            value={username}
            onChange={setUsername}
            onValidityChange={setValidUsername} />
          {username !== '' &&
            <Url size=".8rem" isValid={validUsername}>
              https://{username}.pctr.app
            </Url>
          }
        </FormField>
        <FormField>
          <Label htmlFor="password" margin="0 0 .5rem 0">Password</Label>
          <Input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={setPassword} />
        </FormField>
        <FormField>
          <AcceptLegalInfo>Register</AcceptLegalInfo>
        </FormField>
        <Button 
          disabled={isDisabled()} 
          onClick={onSubmit} 
          data-tip={getTooltipText()}
          data-for="buttonTooltip"
          loading={loading}>Register</Button>
      </Form>
      <Tooltip backgroundColor="#000" id="buttonTooltip" effect="solid" />
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

const Url = styled(typography.s)<{ isValid: number }>`
  margin-top: .5rem;
  color: ${({ isValid }) => isValid === 0 ? colors.SEC_TEXT_COLOR : isValid === 2 ? colors.GREEN : colors.RED };
`;

export default Step2;