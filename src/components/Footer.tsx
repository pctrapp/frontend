import { FC } from 'react';
import styled from 'styled-components';

import { typography } from '../atoms/constans';
import Anchor from './Anchor';

const Footer: FC = () => {
  return (
    <FooterContainer>
      <Legal>
        <Anchor href="/privacy">
          Privacy
        </Anchor>
        {/*}
        <Anchor href="/terms">
          Terms
        </Anchor>
        {*/}
      </Legal>
      <typography.p>Copyright © {new Date().getFullYear()} pctr.app</typography.p>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, .05);
  padding: 2rem 0;
  height: 60px;

  a {
    margin-right: 1.75rem;
  }
`;

const Legal = styled.div`
  display: flex;
  align-items: center;
`;

export default Footer;