import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { colors, typography } from '../../atoms/constans';
import core from '../../core';
import { ALERT } from '../../core/events';
import { getCookie } from '../../lib/cookie';
import { IUser } from '../../types';
import Button from '../Button';

interface Props {
  user: IUser,
}

const Privacy: FC<Props> = ({ user }) => {
  const [showAPIKey, setShowAPIKey] = useState(false);
  const [activePrivacy, setActivePrivacy] = useState<'public' | 'intern' | 'private'>(user.privacy);
  const [loading, setLoading] = useState(false);
  
  function copyApiKey() {
    navigator.clipboard.writeText(user.api_key || '');
    ALERT.emit({ type: 'success', title: 'API Key copied' });
  }

  async function regenerateApiKey() {
    const response = await core.api
      .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', null)}` } } })
      .get('users/@me/reset');

    if (response.status === 200) {
      user.api_key = response.data.api_key;
      setShowAPIKey(false);
      ALERT.emit({ type: 'success', title: 'API Key regenerated successfully' });
    } else {
      ALERT.emit({ type: 'error', title: response.data.message });
    }
  }

  async function updatePrivacy(type: string) {
    if (loading) return;
    setLoading(true);

    const response = await core.api
      .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', null)}` } } })
      .patch('users/@me', {
        privacy: type,
      });

    if (response.status !== 200) {
      ALERT.emit({ title: response.data.message, type: 'error' });
    } else {
      setActivePrivacy(type as typeof activePrivacy);
      ALERT.emit({ title: 'Privacy changed successfully', type: 'success' });
    }

    setLoading(false);
  }

  return (
    <>
      <typography.h4 margin="0 0 1rem 0">Profile privacy</typography.h4>
      <PrivacyOption 
        title="Public"
        setSelected={updatePrivacy}
        description="Your profile can be accessed by everyone even external users" 
        selected={activePrivacy} />
      <PrivacyOption 
        title="Intern"
        setSelected={updatePrivacy}
        description="Only logged in users can see your profile" 
        selected={activePrivacy} />
      <PrivacyOption 
        title="Private"
        setSelected={updatePrivacy}
        description="Only you can see your profile" 
        selected={activePrivacy} />
      <typography.h4 margin="1rem 0 0 0">Image Privacy</typography.h4>
      <typography.p>At the moment, every image that is uploaded is publicly accessible via the link. We are currently working on private images.</typography.p>
      <typography.h4 margin="1rem 0 0 0">Access tokens</typography.h4>
      <SubHeadline>API Token</SubHeadline>
      <ApiKey>
        {!showAPIKey 
          ? <Linkable onClick={() => setShowAPIKey(true)}>Click to reveal</Linkable>
          : <typography.p>{user.api_key}</typography.p>
        }
      </ApiKey>
      <FlexBox>
        <SmallButton onClick={copyApiKey}>Copy</SmallButton>
        <SmallButton onClick={regenerateApiKey} margin="0 0 0 1rem">Regenerate</SmallButton>
      </FlexBox>
    </>
  )
}

const PrivacyOption: FC<{ selected: string, title: string, description: string, setSelected: Function }> = (props) => {
  return (
    <PrivacyOptionWrapper onClick={() => props.setSelected(props.title.toLowerCase())}>
      <div>
        <typography.pB color={colors.PRIM_TEXT_COLOR}>{props.title}</typography.pB>
        <typography.s>{props.description}</typography.s>
      </div>
      <PrivacyOptionDot active={props.selected === props.title.toLowerCase()} />
    </PrivacyOptionWrapper>
  )
}

const SubHeadline = styled(typography.h5)`
  color: ${colors.SEC_TEXT_COLOR};
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: .25rem;
`;

const ApiKey = styled.div`
  margin-bottom: .75rem;
`;

const Linkable = styled.a`
  text-decoration: none;
  color: ${colors.BRAND};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SmallButton = styled(Button)`
  padding: .6rem 1rem;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const PrivacyOptionWrapper = styled.div`
  background: #11161C;
  border-radius: 10px;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  box-shadow: ${colors.BOX_SHADOW};
  cursor: pointer;

  &:hover {
    background: #161C24;
  }
`;

const PrivacyOptionDot = styled('div')<{ active: boolean }>`
  width: 22px;
  height: 22px;
  border: 2px solid ${colors.PRIM_TEXT_COLOR};
  border-radius: 50%;
  transition: border-color 200ms;
  position: relative;

  &::before {
    transition: all 200ms;
  }

  ${({ active }) => active && `
    border-color: ${colors.BRAND};

    &::before {
      content: '';
      width: 11px;
      height: 11px;
      background: ${colors.BRAND};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`;

export default Privacy;