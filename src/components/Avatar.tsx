import React, { FC } from 'react';
import styled, { CSSProperties } from 'styled-components';

import { colors } from '../atoms/constans';

interface Props {
  url?: string,
  username?: string,
  width?: number,
  height?: number,
  alt?: string,
  withBg?: boolean,
}

const Avatar: FC<Props> = ({ withBg = false, url, width = 100, height = 100, alt = 'Users Avatar', username, ...props }) => {
  function getAvatarStyles(): CSSProperties {
    if (!url) return {};

    return {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: `url(${url})`,
      backgroundColor: withBg ? undefined : 'unset',
    }
  }
  
  return (
    <AvatarWrapper width={width} height={height} {...props} style={getAvatarStyles()}>
      {!url && <span>{username?.charAt(0).toUpperCase()}</span>}
    </AvatarWrapper>
  )
}

const AvatarWrapper = styled('div')<{ width: number, height: number }>`
  background-color: ${colors.SEC_BG};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ width }) => `${width / 2}px`};
  font-weight: 500;
`;

export default Avatar;