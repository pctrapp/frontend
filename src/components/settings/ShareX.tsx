import React, { FC } from 'react';
import styled from 'styled-components';

import { typography, colors } from '../../atoms/constans';
import { imageUploaderCode, urlUploaderCode } from '../../data/uploader';
import { IUser } from '../../types';
import Anchor from '../Anchor';
import CodeBox from '../CodeBox';

interface Props {
  user: IUser,
}

const ShareX: FC<Props> = ({ user }) => {
  return (
    <>
      <typography.h4>ShareX Settings</typography.h4>
      <typography.p>
        As pointed our in our{' '}
        <Anchor href="/getting-started">Getting Started Guide</Anchor>
        , pctr.app using ShareX for screen capturing. To ensure that pctr.app is working correctly with your local ShareX configuration, we suggest to visit our{' '}
        <Anchor href="/getting-started">Getting Started Guide</Anchor>{' '}
        or if you already know the steps, we provide your custom uploader code below.
      </typography.p>
      <SimpleList>
        <li>
          <Anchor href={`/${user.username}/settings/images`}>Image Uploader</Anchor>
        </li>
        {/*}
        <li>
          <Anchor href={`/${user.username}/settings/urls`}>URL Uploader</Anchor>
        </li>
        {*/}
      </SimpleList>
    </>
  )
}

const SimpleList = styled.ul`
  padding: 0 0 0 1.25rem;
  margin: .75rem 0 0 0;

  li {
    position: relative;

    &::before {
      display: block;
      content: '';
      width: 5px;
      height: 5px;
      background: ${colors.SEC_TEXT_COLOR};
      border-radius: 50%;
      position: absolute;
      left: -12px;
      top: 9px;
    }
  }
`;

export default ShareX;