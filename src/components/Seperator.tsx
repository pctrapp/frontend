import { FC } from 'react';
import styled from 'styled-components';

import { colors, typography } from '../atoms/constans';

interface Props {
  margin?: string,
}

const Seperator: FC<Props> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Line />
      <typography.s size="1rem">{children}</typography.s>
      <Line />
    </Container>
  )
}

const Container = styled('div')<{ margin?: string }>`
  width: 100%;
  margin: ${({ margin }) => margin || ''};
  display: grid;
  grid-template-columns: auto 1.5rem auto;
  align-items: center;
  grid-gap: .5rem;
  justify-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.SEC_TEXT_COLOR};
`;

export default Seperator;