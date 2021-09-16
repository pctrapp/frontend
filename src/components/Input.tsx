import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { colors } from '../atoms/constans';
import Spinner from './Spinner';

interface Props {
  type: string,
  value?: string,
  id?: string,
  name?: string,
  onChange?: (value: string) => void,
  loading?: boolean,
  onDoneTyping?: () => void,
  doneTypingInterval?: number,
  onKeyDown?: () => void,
  borderColor?: string,
  onBlur?: () => void,
}

const Input: FC<Props> = ({ onBlur, onKeyDown, onChange, loading, onDoneTyping, doneTypingInterval = 1500, ...props }) => {
  const [focus, setFocus] = useState(false);
  const [typingTimer, setTypingTimer] = useState<any>(null);

  function startTypingTimeout() {
    if (!onDoneTyping) return;

    clearTimeout(typingTimer);
    setTypingTimer(setTimeout(onDoneTyping, doneTypingInterval));
  }

  function clearTypingTimeout() {
    if (!onDoneTyping) return;

    clearTimeout(typingTimer);
    setTypingTimer(null);
  }

  function onKeyDownHandler() {
    clearTypingTimeout();
    if (onKeyDown) onKeyDown();
  }

  function blurLocalHandler() {
    setFocus(false);
    if (onBlur) onBlur();
  }

  return (
    <InputWrapper hasLoader={loading} focus={focus} borderColor={props.borderColor}>
      <StyledInput
        onFocus={() => setFocus(true)}
        onBlur={blurLocalHandler}
        onKeyUp={() => startTypingTimeout()}
        onKeyDown={onKeyDownHandler}
        {...props} 
        onChange={({ target: { value } }) => onChange ? onChange(value) : null} />
      {loading && 
        <SpinnerWrapper>
          <Spinner dimension={13} />
        </SpinnerWrapper>
      }
    </InputWrapper>
  )
}

const InputWrapper = styled('div')<{ hasLoader?: boolean, focus: boolean, borderColor?: string }>`
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 4px;
  transition: border 200ms;

  &:hover {
    border: 1px solid #000;
  }

  ${({ hasLoader }) => hasLoader && `
    display: grid; 
    grid-template-columns: auto 30px;
    align-items: center;
  `}

  ${({ focus }) => focus && `
    border: 1px solid ${colors.BRAND} !important;
  `}

  ${({ borderColor }) => borderColor && `
    border-color: ${borderColor} !important;
  `}
`;

const StyledInput = styled('input')`
  background: rgba(0, 0, 0, .2);
  outline: none;
  color: ${colors.PRIM_TEXT_COLOR};
  width: 100%;
  padding: 1rem;
  border: none;
  font-size: 1.4rem;
`;

const SpinnerWrapper = styled.div`
  background: rgba(0, 0, 0, .2);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Input;