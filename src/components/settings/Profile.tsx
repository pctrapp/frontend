import React, { ChangeEvent, CSSProperties, FC, useRef, useState } from 'react';
import styled from 'styled-components';
import router from 'next/router';

import { icons } from '../../assets';
import { colors, typography } from '../../atoms/constans';
import core from '../../core';
import { ALERT } from '../../core/events';
import { getCookie } from '../../lib/cookie';
import Tooltip from '../../lib/tooltip';
import { getAvatarURL, getBannerUrl } from '../../lib/utils';
import { IUser } from '../../types';
import Avatar from '../Avatar';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import Textarea from '../Textarea';
import UsernameChecker from '../UsernameChecker';

interface Props {
  user: IUser,
}

const Profile: FC<Props> = ({ user: oldUser }) => {
  const [profile, setProfile] = useState({
    username: oldUser.username,
    website: oldUser.website || '',
    bio: oldUser.bio || '',
    location: oldUser.location || '',
  });
  const [loading, setLoading] = useState<string | null>(null);
  const [validUsername, setValidUsername] = useState<number>(2);
  const [user, setUser] = useState(oldUser);

  const profileImageRef = useRef<HTMLInputElement>(null);
  const profileHeaderRef = useRef<HTMLInputElement>(null);

  async function uploadProfileImage(e: ChangeEvent, type: 'picture' | 'header') {
    if (loading) return;
    setLoading(`profile_${type}`);

    const file = (e.target as HTMLInputElement).files?.item(0);
    if (!file) return;

    const sizeInMb = file.size / (1024 * 1024);
    if (sizeInMb > (type === 'picture' ? 3 : 5)) {
      ALERT.emit({ title: 'Maximum file size exceeded', type: 'error' });
      setLoading(null);
      return;
    }

    if (!['png', 'jpeg', 'jpg'].includes(file.name.split('.').pop() || '')) {
      ALERT.emit({ title: 'Invalid file type', type: 'error' });
      setLoading(null);
      return;
    }

    const payload = new FormData();
    payload.append(type, file);
    const response = await core.api
      .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', null)}` } } })
      .patch('users/@me', payload);

    if (response.status === 200) {
      setUser((x) => {
        return {
          ...x,
          avatar: response.data.avatar,
          banner: response.data.banner,
        }
      });
      ALERT.emit({ title: 'Profile updated', type: 'success' });
    } else {
      ALERT.emit({ title: response.data.message, type: 'error' });
    }

    setLoading(null);
  }

  async function saveProfile() {
    if (loading) return;
    setLoading('profile');

    if (validUsername !== 2 || profile.username === '') {
      ALERT.emit({ title: 'Invalid Username', message: 'Looks like your username is invalid or does already exist', type: 'error' });
      setLoading(null);
      return;
    }

    if (profile.website !== '' && !profile.website.startsWith('http')) {
      ALERT.emit({ title: 'Invalid Website', message: 'Make sure your website starts either with http or https', type: 'error' });
      setLoading(null);
      return;
    }

    if (profile.bio !== '' && profile.bio.trim().length > 300) {
      ALERT.emit({ title: 'Bio length exceeded', message: 'Your biography can consist of a maximum of 300 characters', type: 'error' });
      setLoading(null);
      return;
    }

    const response = await core.api
      .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', null)}` } } })
      .patch('users/@me', profile);

    if (response.status === 200) {
      ALERT.emit({ title: 'Profile updated', type: 'success' });
      router.replace(`/${response.data.username}/settings/profile`);
      setValidUsername(2);
    } else {
      ALERT.emit({ title: response.data.message, type: 'error' });
    }

    setLoading(null);
  }

  async function deleteUserMedia(type: string) {
    const response = await core.api
      .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', null)}` } } })
      .post(`users/@me/${type}/delete`);
    
    if (response.status === 200) {
      ALERT.emit({ title: 'Profile updated', type: 'success' });
      setUser((x) => {
        return {
          ...x,
          avatar: response.data.avatar,
          banner: response.data.banner,
        }
      });
    } else {
      ALERT.emit({ title: response.data.message, type: 'error' });
    }
  }

  function getBannerStyles(): CSSProperties {
    if (!user.banner) return {};

    return {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: `url(${getBannerUrl(user.id, user.banner)})`
    }
  }

  return (
    <>
      <typography.h4>Profile picture</typography.h4>
      <ProfilePictureWrapper>
        <AvatarWrapper>
          <Avatar 
            url={user.avatar && getAvatarURL(user.id, user.avatar)}
            width={80}
            height={80}
            username={user.username} />
        </AvatarWrapper>
        <ChangeActions>
          <ButtonWrapper>
            <Button 
              background="#1c1c1c" 
              loading={loading === 'profile_picture'}
              onClick={() => profileImageRef.current?.click()}>Change profile picture</Button>
            {user.avatar &&
              <Button background="#1c1c1c" onClick={() => deleteUserMedia('avatars')}>
                <icons.trash width="16px" height="16px" />
              </Button>
            }
          </ButtonWrapper>
          <typography.s margin=".75rem 0 0 0">Only JPG or PNG and maximum 3MB.</typography.s>
        </ChangeActions>
      </ProfilePictureWrapper>
      <typography.h4>Profile header</typography.h4>
      <ProfileHeaderWrapper>
        <SplashScreen style={getBannerStyles()} />
        <ProfileHeaderLowerSection>
          <ButtonWrapper>
            <Button 
              background="#1c1c1c"
              loading={loading === 'profile_header'}
              onClick={() => profileHeaderRef.current?.click()}>Change profile header</Button>
            {user.banner &&
              <Button background="#1c1c1c" onClick={() => deleteUserMedia('banners')}>
                <icons.trash width="16px" height="16px" />
              </Button>
            }
          </ButtonWrapper>
          <typography.s>Only JPG and PNG and maximum 5MB.</typography.s>
        </ProfileHeaderLowerSection>
      </ProfileHeaderWrapper>
      <typography.h4>Public profile</typography.h4>
      <TwoColumns>
        <Field>
          <Label htmlFor="username">Username</Label>
          <UsernameChecker 
            value={profile.username}
            defaultValidity={2}
            user={oldUser}
            onChange={(val) => setProfile((x) => { return { ...x, username: val } })}
            onValidityChange={setValidUsername} />
          {profile.username !== '' &&
            <Url size=".8rem" isValid={validUsername}>
              https://{profile.username}.pctr.app
            </Url>
          }
        </Field>
        <Field>
          <Label htmlFor="website">Website</Label>
          <Input 
            type="text" 
            value={profile.website}
            onChange={(val) => setProfile((x) => { return { ...x, website: val } })}
            id="website" 
            name="website" />
        </Field>
      </TwoColumns>
      <TwoColumns>
        <Field>
          <Label htmlFor="location">Location</Label>
          <Input 
            type="text" 
            value={profile.location}
            onChange={(val) => setProfile((x) => { return { ...x, location: val } })}
            id="location" 
            name="location" />
        </Field>
      </TwoColumns>
      <Field>
        <Label htmlFor="bio">Bio</Label>
        <Textarea 
          minHeight="150px"
          value={profile.bio}
          onChange={(val) => setProfile((x) => { return { ...x, bio: val } })} id="bio" />
      </Field>
      <SaveButton
        onClick={saveProfile}
        disabled={profile.username === ''}
        data-tip={profile.username.trim().length === 0 ? 'Username is required' : undefined}
        data-for="buttonTooltip"
        loading={loading === 'profile'}>Save</SaveButton>
      <Tooltip backgroundColor="#000" id="buttonTooltip" effect="solid" />
      <input 
        type="file" 
        style={{ display: 'none' }}
        accept=".jpg,.jpeg,.png" 
        onChange={(e) => uploadProfileImage(e, 'picture')}
        ref={profileImageRef} />
      <input 
        type="file" 
        style={{ display: 'none' }}
        accept=".jpg,.jpeg,.png"
        onChange={(e) => uploadProfileImage(e, 'header')}
        ref={profileHeaderRef} />
    </>
  )
}

const ButtonWrapper = styled.div`
  display: flex;

  button:first-child {
    margin-right: 1rem;
  }
`;

const ContrastBox = styled.div`
  background: rgba(0, 0, 0, .2);
  border-radius: 8px;
  margin: 1rem 0;
  padding: 2rem 1rem;
`;

const ProfilePictureWrapper = styled(ContrastBox)`
  display: grid;
  grid-template-columns: 100px auto;
  grid-gap: 3rem;
  margin-bottom: 1.5rem;
`;

const ProfileHeaderWrapper = styled(ContrastBox)`
  display: grid;
  grid-template-rows: 150px auto;
  padding: 0;
  overflow: hidden;
`;

const AvatarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SplashScreen = styled.div`
  background: ${colors.BRAND};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileHeaderLowerSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1.5rem;
  align-items: center;
`;

const ChangeActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin: .8rem 0 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const SaveButton = styled(Button)`
  width: 100%;
  margin-top: 1.75rem;
`;

const Url = styled(typography.s)<{ isValid: number }>`
  margin-top: .5rem;
  color: ${({ isValid }) => isValid === 0 ? colors.SEC_TEXT_COLOR : isValid === 2 ? colors.GREEN : colors.RED };
`;

export default Profile;