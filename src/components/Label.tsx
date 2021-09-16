import { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../atoms/constans';

interface Props {
  htmlFor: string,
  margin?: string,
}

const Label: FC<Props> = (props) => {
  return (
    <StyledLabel {...props} />
  )
}

const StyledLabel = styled('label')<{ margin?: string }>`
  margin-bottom: .5rem;
  text-transform: uppercase;
  color: ${colors.SEC_TEXT_COLOR};
  font-size: 1.2rem;
  font-weight: 500;
  display: block;

  ${({ margin }) => margin && `
    margin: ${margin};
  `}
`;

export default Label;