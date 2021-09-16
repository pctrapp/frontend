import React from 'react';
import styled from 'styled-components';
import router from 'next/router';

import { colors, typography } from '../../atoms/constans';
import { getAvatarURL } from '../../lib/utils';
import { IUser } from '../../types';
import Avatar from '../Avatar';
import Button from '../Button';
import Seperator from '../Seperator';

interface Props {
  user: IUser,
  useDifferent: () => void,
}

const AlreadyLoggedIn: React.FC<Props> = ({ user, useDifferent }) => {
  return (
    <>
      <typography.h4 align="center">You are logged in as</typography.h4>
      <UserWrapper>
        <Avatar 
          width={60} 
          username={user.username}
          height={60} 
          url={user.avatar && getAvatarURL(user.id, user.avatar)} />
        <Details>
          <typography.pB color={colors.PRIM_TEXT_COLOR}>{user.username}</typography.pB>
        </Details>
      </UserWrapper>
      <FullButton onClick={() => router.push(`/${user.username}`)}>Use {user.username}</FullButton>
      <Seperator margin=".75rem">or</Seperator>
      <FullButton onClick={useDifferent} background="#11161C">Use a different account</FullButton>
    </>
  )
}

const UserWrapper = styled.div`
  padding: 1rem 2rem;
  margin: 1.25rem 0;
  display: flex;
  background: #11161C;
  border-radius: 8px;
`;

const Details = styled.div`
  display: flex;
  margin-left: 2rem;
  flex-direction: column;
  justify-content: center;
`;

const FullButton = styled(Button)`
  width: 100%;
`;

export default AlreadyLoggedIn;