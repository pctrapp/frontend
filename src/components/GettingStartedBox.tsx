import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import router from 'next/router';

import { typography, colors } from '../atoms/constans';
import Anchor from './Anchor';
import Button from './Button';
import CodeBox from './CodeBox';
import { media } from '../lib/utils';
import { imageUploaderCode } from '../data/uploader';
import { IUser } from '../types';

const steps = ['Download ShareX', 'Setup custom uploader', 'Upload your first Screenshot'];

interface Props {
  user: IUser,
}

const GettingStartedBox: FC<Props> = ({ user }) => {
  const [step, setStep] = useState(0);

  function downloadUploader() {
    const elt = document.createElement('a');
    elt.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(imageUploaderCode.split('{{key}}').join(user?.api_key || '')));
    elt.setAttribute('download', 'pctr.app.sxcu');

    elt.style.display = 'none';
    document.body.appendChild(elt);

    elt.click();

    document.body.removeChild(elt);
  }

  return (
    <Box>
      <typography.h4 weight={300}>Getting Started</typography.h4>
      <typography.p>Complete these steps and you're ready to go.</typography.p>
      <TwoColumns>
        <Menu>
          {steps.map((txt, i) => 
            <MenuItem active={i === step} onClick={() => setStep(i)} key={i}>
              <Number>{i + 1}</Number>
              <typography.s color={i === step ? colors.PRIM_TEXT_COLOR : colors.SEC_TEXT_COLOR}>
                {txt}
              </typography.s>
            </MenuItem>
          )}
        </Menu>
        <Content>
          {step === 0 &&
            <>
              <typography.h5 weight={300}>Download and Install ShareX</typography.h5>
              <typography.p>
                Currently ShareX is only available for Windows. Download the latest version from their official website:{' '} 
                <Anchor href="https://getsharex.com/" target="_blank">
                  getsharex.com
                </Anchor>.
              </typography.p>
              <ButtonWrapper>
                <NextButton onClick={() => setStep((s) => s + 1)}>Next</NextButton>
              </ButtonWrapper>
            </>
          }
          {step === 1 &&
            <>
              <typography.h5 weight={300}>Setup pctr.app's custom uploader</typography.h5>
              <Description>
                To ensure that the screenshots are uploaded correctly, you need to create a custom uploader.<br />
                Open ShareX and follow <i>Destinations --&gt; Custom upload settings</i>. Copy the code below and select <i>import --&gt; From clipboard</i>.
              </Description>
              <Description>
                <HightLight>Warning:</HightLight> This code includes your unique API token. You should <b>never</b> reveal this token to other users. You can reset your token at any time if you accidentally made it public. Just go to your{' '}
                <Anchor href={`/${user.username}/settings/privacy`}>Settings Page</Anchor>.
              </Description>
              <CodeBox spoiler copy>
                {imageUploaderCode.split('{{key}}').join(user?.api_key || '')}
              </CodeBox>
              <Description size="1.2rem" margin="1rem 0 0 0">
                If you're unable to reveal this code box you can download your custom uploader{' '}
                <Linkable onClick={downloadUploader}>here</Linkable>.
              </Description>
              <ButtonWrapper>
                <NextButton onClick={() => setStep((s) => s + 1)}>Next</NextButton>
              </ButtonWrapper>
            </>
          }
          {step === 2 &&
            <>
              <typography.h5 weight={300}>You did it!</typography.h5>
              <Description>You're are ready to go. Make sure that you select the defined custom uploader under <i>Destinations --&gt; Image Uploader</i>.</Description>
              <Description>
                You need help?{' '}
                <Anchor href="https://discord.gg/CVJSVjjgFu" target="_blank">Join our Discord!</Anchor>
              </Description>
              <ButtonWrapper>
                <Anchor href={`/${user.username}`}>My Profile</Anchor>
              </ButtonWrapper>
            </>
          }
        </Content>
      </TwoColumns>
    </Box>
  )
}

const Box = styled.div`
  padding: 2rem;
  border-radius: 10px;
  background: ${colors.SEC_BG};
  margin-top: 1.5rem;
  box-shadow: ${colors.BOX_SHADOW};

  h4 {
    margin-bottom: .5rem;
  }
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  margin-top: 1.25rem;

  ${media.sizeII`
    display: flex;
    flex-direction: column;
  `}
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 1.75rem 0;
`;

const Linkable = styled.a`
  text-decoration: none;
  color: ${colors.BRAND};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MenuItem = styled('li')<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: .75rem .5rem;
  border-radius: 5px;
  margin-bottom: .5rem;
  transition: background 200ms;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, .05);
  }

  ${({ active }) => active && `
    background: rgba(255, 255, 255, .05);
  `}
`;

const HightLight = styled.span`
  color: ${colors.RED};
  font-weight: 500;
`;

const Number = styled.span`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .8rem;
  background: ${colors.BRAND}33;
  color: ${colors.BRAND};
  margin-right: .75rem;
`;

const Content = styled.div`
  overflow: auto;
  padding: 0 3rem;

  ${media.sizeII`
    padding: 0;
  `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  button {
    max-width: 80px;
    width: 100%;
  }

  ${media.sizeII`
    margin-top: 1.5rem;
    
    button {
      max-width: inherit; 
    }
  `}
`;

const NextButton = styled(Button)`
  padding: .75rem 2rem;
`;

const Description = styled(typography.p)`
  margin-bottom: 1.5rem;
`;

export default GettingStartedBox;