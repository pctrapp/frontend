import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { colors } from '../atoms/constans';

interface Props {
  href: string,
  target?: string,
  margin?: string,
}

const Anchor: FC<Props> = ({ href, children, ...props }) => {
  return (
    <Link href={href} passHref>
      <StyledLink {...props}>
        {children}
      </StyledLink>
    </Link>
  )
};

const StyledLink = styled('a')<{ margin?: string }>`
  color: ${colors.BRAND};
  text-decoration: none;
  
  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  &:hover {
    text-decoration: underline;
    opacity: .8;
  }
`;

export default Anchor;