import React from 'react';
import { NextPage, NextPageContext } from 'next';
import styled from 'styled-components';

import { typography } from '../atoms/constans';
import DefaultHead from '../components/DefaultHead';

interface Props {
  status_code?: number,
}

const ErrorPage: NextPage<Props> = ({ status_code }) => {
  return (
    <>
      <DefaultHead>
        <title>Looks like something went wrong..</title>
      </DefaultHead>
      <Wrapper>
        <Container>
          <typography.h1 align="center">😟</typography.h1>
          <typography.h3 align="center">Our server is feeling a little down</typography.h3>
          <Description align="center">Please try again in a few moments.</Description>
          <typography.sB>Error {status_code}</typography.sB>
        </Container>
      </Wrapper>
    </>
  )
}

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  const status_code = res ? res.statusCode : err ? err.statusCode : 404;
  return { status_code };
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

export default ErrorPage;