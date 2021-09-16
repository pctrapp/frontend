import { FC } from 'react';
import styled from 'styled-components';

import { colors } from '../atoms/constans';
import Spinner from './Spinner';

interface Props {
  margin?: string,
  disabled?: boolean,
  background?: string,
  onClick?: (e?: any) => any,
  loading?: boolean,
  big?: boolean,
}

const Button: FC<Props> = ({ loading = false, disabled, children, ...props }) => {
  return (
    <StyledButton disabled={loading || disabled} {...props}>
      {loading ? <Spinner dimension={14} /> : children}
    </StyledButton>
  )
}

const StyledButton = styled('button')<{ margin?: string, background?: string, big?: boolean }>`
  display: block;
  padding: 1rem;
  background: ${({ background }) => background || colors.BRAND};
  color: #fff;
  outline: none;
  border-radius: 5px;
  border: none;
  transition: background 200ms;
  cursor: pointer;

  &:hover {
    background: ${({ background }) => background || colors.BRAND}CC;
  }

  &:disabled {
    background: ${({ background }) => background || colors.BRAND}4D;
    cursor: not-allowed;
  }

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ big }) => big && `
    padding: 1rem 5rem;
  `}
`;

export default Button;