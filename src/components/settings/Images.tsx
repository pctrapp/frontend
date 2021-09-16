import React, { FC } from 'react';
import styled from 'styled-components';

import { colors, typography } from '../../atoms/constans';
import { imageUploaderCode } from '../../data/uploader';
import { downloadTextFile } from '../../lib/utils';
import { IUser } from '../../types';
import CodeBox from '../CodeBox';

interface Props {
  user: IUser,
}

const Images: FC<Props> = ({ user }) => {
  return (
    <>
      <typography.h4>Image Uploader</typography.h4>
      <typography.p margin=".75rem 0">
        <typography.span color={colors.RED} weight={500}>Warning:</typography.span>{' '}
        Changes to this configuration file can cause malfunctions.
      </typography.p>
      <CodeBox spoiler copy>
        {imageUploaderCode.split('{{key}}').join(user.api_key || '')}
      </CodeBox>
      <typography.s size="1.2rem" margin="1rem 0 0 0">
        If you're unable to reveal this code box you can download your custom uploader{' '}
        <Linkable onClick={() => downloadTextFile(imageUploaderCode.split('{{key}}').join(user.api_key || ''), 'pctr.app.sxcu')}>
          here
        </Linkable>.
      </typography.s>
    </>
  )
}

const Linkable = styled.a`
  color: ${colors.BRAND};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Images;