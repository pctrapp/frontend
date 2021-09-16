import { NextPage } from 'next';
import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';

import { typography } from '../atoms/constans';
import DefaultHead from '../components/DefaultHead';

const NotFound: NextPage = () => {
  const emojiRef = createRef<HTMLHeadingElement>();

  useEffect(() => {
    const emoji = `&#${Math.floor(Math.random() * (128567 - 128512 + 1) + 128512)};`;
    if (emojiRef.current) emojiRef.current.innerHTML = emoji;
  }, []);

  return (
    <>
      <DefaultHead>
        <title>Error 404 - Page not found</title>
      </DefaultHead>
      <Wrapper>
        <Container>
          <typography.h1 align="center" ref={emojiRef}></typography.h1>
          <typography.h3 align="center">There's literally nothing here.</typography.h3>
          <Description align="center">We couldn't find the page you requested.</Description>
          <typography.sB>Error 404</typography.sB>
        </Container>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Description = styled(typography.p)`
  margin: 1rem 0 2rem 0;
`;

export default NotFound;