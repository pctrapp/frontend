import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { icons } from '../assets';
import { colors } from '../atoms/constans';
import { ALERT } from '../core/events';
import Button from './Button';

interface Props {
  spoiler?: boolean,
  copy?: boolean,
}

const CodeBox: FC<Props> = ({ children, spoiler = false, copy = false }) => {
  const [showSpoiler, setShowSpoiler] = useState(() => spoiler);

  function copyText() {    
    navigator.clipboard.writeText(String(children));
    ALERT.emit({ type: 'success', title: 'Code copied' });
  }

  return (
    <Wrapper>
      <Pre spoiler={showSpoiler}>
        <Code>
          {children}
          {copy && 
            <CopyBox onClick={copyText} id="copy">
              <icons.copy />
            </CopyBox>
          }
        </Code>
      </Pre>
      {showSpoiler &&
        <Spoiler onClick={() => setShowSpoiler(false)}>
          <Button>Spoiler</Button>
        </Spoiler>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`;

const Spoiler = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  button {
    background: rgba(0, 0, 0, .6);
    text-transform: uppercase;
    font-size: 1.3rem;
    font-weight: 500;

    &:hover {
      background: #000;
    }
  }
`;

const Code = styled.code`
  display: block;
  overflow-x: auto;
  padding: .5em;
  font-family: monospace;
  color: #87909c;
  font-size: 1.2rem;
  line-height: 15px;
  overflow-x: auto;
  background: ${colors.PRIM_BG};
  border: 1px solid #080808;
  position: relative;
`;

const Pre = styled('pre')<{ spoiler?: boolean }>`
  box-sizing: content-box;
  width: 100%;

  ${({ spoiler }) => spoiler && `
    filter: blur(5px);
  `}

  &:hover #copy {
    display: flex;
  }
`;

const CopyBox = styled.span`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, .05);
  position: absolute;
  top: .5rem;
  right: .5rem;
  border-radius: .8rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 200ms;
  display: none;

  &:hover {
    background: rgba(255, 255, 255, .1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default CodeBox;