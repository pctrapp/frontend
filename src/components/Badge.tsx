import { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../atoms/constans';

interface Props {
  margin?: string,
  color?: string,
}

const Badge: FC<Props> = ({ children, ...props }) => {
  return (
    <StyledBadge {...props}>
      {children}
    </StyledBadge>
  )
}

const StyledBadge = styled('span')<{ margin?: string, color?: string }>`
  padding: .4rem .65rem;
  background: ${({ color }) => color || colors.BRAND};
  font-size: 1rem;
  border-radius: 5px;
  font-weight: 300;
  margin: ${({ margin }) => margin || ''};
  display: inline-block;
`;

export default Badge;