import router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors, typography } from '../../atoms/constans';
import core from '../../core';
import { ALERT } from '../../core/events';
import { checkEmail } from '../../lib/validator';
import Anchor from '../Anchor';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import AcceptLegalInfo from './AcceptLegalInfo';
import Tooltip from '../../lib/tooltip';
import Seperator from '../Seperator';

const Step1 = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function redirectToDiscord() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/discord?action=register`);
  }

  function isDisabled() {
    return email === '' || !checkEmail(email);
  }

  function getTooltipText() {
    if (email === '')
      return 'E-Mail is required';
    if (!checkEmail(email))
      return 'Invalid E-Mail';
  }

  async function submitHandler(e: any) {
    e?.preventDefault();

    if (loading) return;
    setLoading(true);

    const response = await core.api.post('auth/magic', {
      email,
    });

    if (response.status === 204) {
      // SUCCESS
      ALERT.emit({ type: 'success', title: 'You did it!', message: 'A verification link has been sent to your email.' });
      setEmail('');
    } else {
      // ERROR
      ALERT.emit({ type: 'error', title: response.data.message });
    }

    setLoading(false);
  }

  return (
    <>
      <typography.h4 align="center">Create an Account</typography.h4>
      <Form onSubmit={submitHandler}>
        <FormField>
          <Label htmlFor="email" margin="0 0 .25rem 0">E-Mail</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={setEmail} />
        </FormField>
        <FormField>
          <AcceptLegalInfo>Verify E-Mail</AcceptLegalInfo>
        </FormField>
        <Button 
          loading={loading}
          data-tip={getTooltipText()}
          data-for="buttonTooltip"
          disabled={isDisabled()} 
          onClick={submitHandler}>Verify E-Mail</Button>
      </Form>
      <Seperator margin=".75rem 0">or</Seperator>
      <DiscordBtn background="#5865F2" onClick={redirectToDiscord}>Discord</DiscordBtn>
      <HasAccount>
        <Anchor href="/login">Already have an account?</Anchor>
      </HasAccount>
      <Tooltip id="buttonTooltip" effect="solid" backgroundColor="#000" />
    </>
  )
}

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

const HasAccount = styled(typography.s)`
  margin-top: 1rem;
`;

export default Step1;