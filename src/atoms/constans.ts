import styled, { css } from 'styled-components';

export interface TypoProps {
  align?: 'center' | 'left' | 'right',
  color?: string,
  weight?: number,
  size?: string,
  margin?: string,
}

export const colors = {
  BRAND: '#257DE9',
  GREEN: '#4BCA81',
  RED: '#dc3546',

  PRIM_TEXT_COLOR: '#fff',
  SEC_TEXT_COLOR: '#868686',
  INFO: '#add8e6',

  PRIM_BG: '#121212',
  SEC_BG: '#171717',

  BOX_SHADOW: '0px 4px 7px rgba(0, 0, 0, 0.1)',
}

export const typography = {
  h1: styled('h1')<TypoProps>`
    font-size: ${({ size }) => size || '4.8rem'};
    font-family: 'Inter', sans-serif;
    font-weight: ${({ weight }) => weight || '700'};
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.PRIM_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  h2: styled('h2')<TypoProps>`
    font-size: ${({ size }) => size || '3rem'};
    font-family: 'Inter', sans-serif;
    font-weight: ${({ weight }) => weight || '700'};
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.PRIM_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  h3: styled('h3')<TypoProps>`
    font-size: ${({ size }) => size || '2.4rem'};
    font-family: 'Inter', sans-serif;
    font-weight: ${({ weight }) => weight || '700'};
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.PRIM_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  h4: styled('h4')<TypoProps>`
    font-size: ${({ size }) => size || '2rem'};
    font-family: 'Inter', sans-serif;
    font-weight: ${({ weight }) => weight || '700'};
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.PRIM_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  h5: styled('h5')<TypoProps>`
    font-size: ${({ size }) => size || '1.7rem'};
    font-family: 'Inter', sans-serif;
    font-weight: ${({ weight }) => weight || '700'};
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.PRIM_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  p: styled('p')<TypoProps>`
    font-size: ${({ size }) => size || '1.4rem'};
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.SEC_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  pB: styled('p')<TypoProps>`
    font-size: ${({ size }) => size || '1.4rem'};
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.SEC_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  s: styled('p')<TypoProps>`
    font-size: ${({ size }) => size || '1.2rem'};
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.SEC_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  sB: styled('p')<TypoProps>`
    font-size: ${({ size }) => size || '1.2rem'};
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.SEC_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
  span: styled('span')<TypoProps>`
    font-size: ${({ size }) => size || '1.4rem'};
    font-family: 'Inter', sans-serif;
    font-weight: ${({ weight }) => weight || '300'};
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color || colors.SEC_TEXT_COLOR};
    margin: ${({ margin }) => margin || ''};
  `,
}

export const SIZES: { [k: string]: number } = {
  sizeI: 1080,
  sizeII: 800,
  sizeIII: 638,
  sizeIV: 550,
  sizeV: 425,
};

export const pr = {
  description: 'Upload and Share Screenshots in less than a minute',
}

export const layout = {
  container: styled('div')<{ medium?: boolean }>`
    margin: 0 auto;
    padding: 0 2vw;
    max-width: calc(${({ medium }) => medium ? 750 : 1130}px + 4vw);
    width: 100%;
  `,
}