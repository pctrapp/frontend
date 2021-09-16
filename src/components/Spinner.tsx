import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

import { colors } from '../atoms/constans';

interface Props {
  dimension?: number,
}

const Spinner: FC<Props> = ({ dimension }) => {
  return (
    <Svg viewBox="0 0 50 50" dimension={dimension}>
      <Circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></Circle>
    </Svg>
  )
}

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Svg = styled('svg')<{ dimension?: number }>`
  animation: ${rotate} 2s linear infinite;
  z-index: 2;
  width: ${({ dimension }) => dimension || 20}px;
  height: ${({ dimension }) => dimension || 20}px;
`;

const Circle = styled.circle`
  stroke: ${colors.PRIM_TEXT_COLOR};
  stroke-linecap: round;
  stroke-width: 3px;
  animation: ${dash} 1.5s ease-in-out infinite;
`;

export default Spinner;