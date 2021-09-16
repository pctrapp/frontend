import { NextPage } from 'next';
import styled from 'styled-components';

import { layout, typography } from '../atoms/constans';
import Anchor from '../components/Anchor';
import DefaultHead from '../components/DefaultHead';
import GettingStartedBox from '../components/GettingStartedBox';
import { requirePageAuth } from '../lib/auth';
import { IUser } from '../types';

interface Props {
  user: IUser,
}

const GettingStartedView: NextPage<Props> = ({ user }) => {
  return (
    <>
      <DefaultHead>
        <title>Getting started with pctr.app</title>
      </DefaultHead>
      <Container>
        <typography.h1 size="3rem">Welcome to Picture App</typography.h1>
        <typography.p>
        Thanks for registering with Picture App. To use our service at its best and upload your first screenshot to the web, you need to download{' '}
        <Anchor href="https://getsharex.com/" target="_blank">ShareX</Anchor>
        , an open source tool to capture any part of your screen. Follow our guide step by step and you will be ready in just a few minutes.
        </typography.p>
        <GettingStartedBox user={user} />
      </Container> 
    </>
  )
}

export const getServerSideProps = requirePageAuth;

const Container = styled(layout.container)`
  padding: 4rem 2vw;

  h1 {
    margin-bottom: .5rem;
  }
`;

export default GettingStartedView;