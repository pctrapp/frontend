import { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import router from 'next/router';

import { colors } from '../atoms/constans';
import { ALERT } from '../core/events';
import core from '../core';
import Step1 from '../components/register/Step1';
import Step2 from '../components/register/Step2';
import DefaultHead from '../components/DefaultHead';

interface Props {
  payload?: any,
  error_message?: string,
  error_detail?: string,
}

const Register: NextPage<Props> = ({ payload, error_message, error_detail }) => {

  useEffect(() => {    
    if (error_message) {
      setTimeout(() => {
        ALERT.emit({ type: 'error', title: error_message, message: error_detail || undefined });
      }, 500); 
      router.replace('/register');
    }
  }, []);

  return (
    <>
      <DefaultHead>
        <title>Create an Account - pctr.app</title>
      </DefaultHead>
      <Wrapper>
        <Box>
          {!payload ? <Step1 /> : <Step2 payload={payload} />}        
        </Box>
      </Wrapper>
    </>
  )
}

export async function getServerSideProps({ query }: any) { 
  const { code, origin } = query;

  if (!code) return { props: {} };

  let url;
  const qs = new URLSearchParams({
    code,
    action: 'register',
  });

  if (origin && origin === 'email') {
    url = `auth/magic?${qs}`;
  } else {
    url = `auth/discord/${code}?action=register`;
  }

  const response = await core.api.get(url);

  if (response.status === 200) {
    return {
      props: {
        payload: response.data,
      },
    }
  }  

  return {
    props: {
      error_message: response.data.message,
      error_detail: response.data.code === 4009 && 'It looks like the link has been used before',
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

const Box = styled.div`
  padding: 3rem 2rem;
  background: ${colors.SEC_BG};
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
  box-shadow: ${colors.BOX_SHADOW};
`;

export default Register;