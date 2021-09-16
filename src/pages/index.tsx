import { NextPage } from 'next';
import router from 'next/router';
import styled from 'styled-components';

import { layout, typography } from '../atoms/constans';
import Anchor from '../components/Anchor';
import Button from '../components/Button';
import DefaultHead from '../components/DefaultHead';
import Footer from '../components/Footer';
import { media } from '../lib/utils';

const Index: NextPage = () => {
  return (
    <>
      <DefaultHead />
      <Hero>
        <HeroInner>
          <typography.h1 align="center">Share Screenshots with your Friends</typography.h1>
          <typography.p align="center" size="1.5rem" margin="1rem 0">Setup pctr.app in just a few minutes and present your screenshots on a custom URL</typography.p>
          <ButtonWrapper>
            <Button onClick={() => router.push('/register')} big>Register</Button>
            <Button onClick={() => router.push('/upload')} big>Upload files</Button>
          </ButtonWrapper>
        </HeroInner>
      </Hero>
      <layout.container>
        <Footer />
      </layout.container>
    </>
  )
}

const Hero = styled(layout.container)`
  display: flex;
  padding: 260px 2vw calc(100vh - 260px - 350px - 60px) 2vw;
  min-height: calc(100vh - 60px);

  ${media.sizeII`
    padding: 100px 2vw;
  `}
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  ${media.sizeII`
    height: max-content;

    h1 {
      font-size: 3.3rem;
    }
  `}

  h1 {
    margin-bottom: 1rem;
    line-height: 4rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.75rem;

  button {
    margin-right: 2rem;
  }

  ${media.sizeII`
    flex-direction: column;

    button {
      width: 100%;
      margin: 0 0 2rem 0;
    }
  `}
`;

export default Index;
