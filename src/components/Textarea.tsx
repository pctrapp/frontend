import { FC } from 'react';
import styled from 'styled-components';

import { colors } from '../atoms/constans';

interface Props {
  onChange?: (value: string) => void,
  value?: string,
  id?: string,
  minHeight?: string,
}

const Textarea: FC<Props> = ({ onChange, ...props }) => {
  return (
    <StyledTextarea 
      {...props}
      onChange={({ target: { value } }) => onChange ? onChange(value) : null} />
  )
}

const StyledTextarea = styled('textarea')<{ minHeight?: string }>`
  background: rgba(0, 0, 0, .2);
  outline: none;
  color: ${colors.PRIM_TEXT_COLOR};
  width: 100%;
  padding: 1rem;
  border: none;
  font-size: 1.4rem;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 4px;
  transition: border 200ms;
  resize: vertical;
  min-height: ${({ minHeight }) => minHeight || ''};

  &:focus {
    border: 1px solid ${colors.BRAND} !important;
  }

  &:hover {
    border: 1px solid #000;
  }
`;

export default Textarea;