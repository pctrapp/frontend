import React, { FC, useState } from 'react';
import styled from 'styled-components';
import router from 'next/router';

import { colors, typography } from '../../atoms/constans';
import core from '../../core';
import { getCookie, removeCookie } from '../../lib/cookie';
import { IUser } from '../../types';
import Button from '../Button';
import { ALERT } from '../../core/events';

interface Props {
  user: IUser,
}

const Account: FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  async function deleteAccount() {
    if (loading) return;
    setLoading(true);

    const response = await core.api
      .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', null)}` } } })
      .delete('users/@me');

    if (response.status === 204) {
      removeCookie('token');
      router.push('/');
      ALERT.emit({ title: 'Account deleted', message: 'Your account and all pictures have been deleted successfully', type: 'success' });
      return;
    }

    ALERT.emit({ title: response.data.message, type: 'error' });
    setLoading(false);
  }

  return (
    <>
      <typography.h4>Delete account</typography.h4>
      <Box>
        <typography.p margin="0 0 1rem 0">This is a one way operation, once you delete your account there is no going back. Please be certain.</typography.p>
        {showBtn ?
          <Button 
          background={colors.RED}
          loading={loading}
          onClick={deleteAccount}>Delete your account</Button>
          :
          <Linkable onClick={() => setShowBtn(true)}>Click to show button</Linkable>
        }
      </Box>
    </>
  )
}

const Box = styled.div`
  background: #11161C;
  border-radius: 8px;
  margin: 1rem 0 0 0;
  padding: 2rem;
`;

const Linkable = styled.a`
  color: ${colors.BRAND};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Account;