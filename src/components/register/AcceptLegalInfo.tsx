import React, { FC } from 'react';

import { typography } from '../../atoms/constans';
import Anchor from '../Anchor';

/**
 * 
 * <typography.s size="1rem">
    By clicking on "Verify E-Mail", you agree to our{' '}
    <Anchor href="/terms">Terms of Service</Anchor>
    {' '}and{' '}
    <Anchor href="/privacy">Privacy Policy</Anchor>
  </typography.s>
 */

const AcceptLegalInfo: FC = ({ children }) => {
  return (
    <typography.s size="1rem">
      By clicking on "{children}", you agree to our{' '}
      <Anchor href="/privacy">Privacy Policy</Anchor>.
    </typography.s>
  )
}

export default AcceptLegalInfo;