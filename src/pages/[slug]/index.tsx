import { NextPage, NextPageContext } from 'next';
import DefaultHead from '../../components/DefaultHead';
import router from 'next/router';
import React from 'react';
import styled, { CSSProperties } from 'styled-components';

import core from '../../core';
import { IUser } from '../../types';
// import { getSession } from '../../lib/auth';
import { getAvatarURL, getBannerUrl, media, redirect } from '../../lib/utils';
import { icons } from '../../assets';
import { typography, colors, layout } from '../../atoms/constans';
import Avatar from '../../components/Avatar';
import { formatInDate } from '../../lib/time';
import Button from '../../components/Button';
import Anchor from '../../components/Anchor';
import { redirectList } from '../../data/redirectlist';
import { getSession, useSession } from '../../context/auth';
import { getCookie } from '../../lib/cookie';

interface Props {
  profile: IUser,
}

const Index: NextPage<Props> = ({ profile: user }) => { 
  const [loggedInUser] = useSession();

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
      <DefaultHead>
          <title>{user.username}'s Profile - pctr.app</title>
          <meta property="og:title" content={`${user.username}'s profile - pctr.app`} key="title" />
          {user.bio &&
            <meta property="og:description" content={user.bio} key="description" />
          }
          {user.banner &&
            <meta property="og:image" content={getBannerUrl(user.id, user.banner)} key="image" />
          }
          {!user.banner && user.avatar &&
            <meta property="og:image" content={getAvatarURL(user.id, user.avatar)} key="image" />
          }
          <meta property="og:url" content={`https://pctr.app/${user.username}`} key="url" />
      </DefaultHead>
      <Container>
        <Card>
          <SplashScreen style={getBannerStyles()} />
          <LowerSection>
            <UserAvatar 
              width={120}
              height={120}
              withBg={true}
              url={user.avatar && getAvatarURL(user.id, user.avatar)} 
              username={user.username} />
            <Details>
              <NameSection>
                <typography.h3 color={user.staff ? colors.RED : colors.PRIM_TEXT_COLOR}>
                  @{user.username}
                </typography.h3>
                {loggedInUser && user.id === loggedInUser.id && 
                  <Button 
                    background="#212121" 
                    onClick={() => router.push(`/${user.username}/settings/profile`)}>Settings</Button>
                }
              </NameSection>
              {user.bio && <Bio>{user.bio}</Bio>}
              {user.website &&
                <Anchor href={user.website} target="_blank" margin=".75rem 0 0 0">
                  <Website>
                    <icons.link />
                    {user.website.split(':')[1].slice(2)}
                  </Website>
                </Anchor>
              }
              {user.location &&
                <AlignedP>
                  <icons.map />
                  {user.location}
                </AlignedP>
              }
              <AlignedP>
                <icons.calendar />
                Member since {formatInDate(user.created_at)}
              </AlignedP>
              {user.staff &&
                <AlignedP>
                  <icons.penguin />
                  Pctr Staff
                </AlignedP>
              }
            </Details>
          </LowerSection>
        </Card>
      </Container>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { req, query, res } = context;
  const { slug } = query;

  if ((slug as string).startsWith('_')) {
    redirect(`/guest/${slug}`, res);
    return;
  }

  const session = await getSession(context);
  
  const shouldRedirect = redirectList.find((x) => x.from === (slug as string).toLowerCase());
  if (shouldRedirect && session) {
    redirect(shouldRedirect.to.split(':slug').join(session.username), res);
    return;
  }

  const response = await core.api
    .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', req)}` } } })
    .get(`users/${slug}`);

  if (response.status === 200) {
    return {
      props: {
        profile: response.data,
      }
    }
  }

  return {
    notFound: true,
  }
}

const Container = styled(layout.container)`
  padding: 2rem 2vw;

  ${media.sizeII`
    padding: 0;
  `}
`;

const Card = styled.div`
  width: 100%;
  background: ${colors.SEC_BG};
  display: grid;
  grid-template-rows: 200px auto;
  border-radius: 15px;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: ${colors.BOX_SHADOW};

  ${media.sizeII`
    border-radius: 0;
  `}
`;

const NameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 1rem 2rem;
  }
`;

const UserAvatar = styled(Avatar)`
  border: 5px solid ${colors.SEC_BG};
  transform: translateY(-60px);
`;

const LowerSection = styled.div`
  padding: 1rem 4rem 2rem;
  display: grid;
  grid-template-columns: calc(4rem + 120px) 1fr;

  ${media.sizeII`
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

const SplashScreen = styled.div`
  background: ${colors.BRAND};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlignedP = styled(typography.s)`
  display: flex;
  align-items: center;
  margin-top: .5rem;

  svg {
    width: 15px;
    height: 15px;
    margin-right: .75rem;
  }
`;

const Website = styled(typography.sB)` 
  display: flex;
  align-items: center;
  color: ${colors.BRAND};

  svg {
    width: 15px;
    height: 15px;
    margin-right: .75rem;
  }
`;

const Bio = styled(typography.s)`
  margin: .25rem 0 0 0;

  ${media.sizeII`
    margin: 1rem 0;
  `}
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;

  ${media.sizeII`
    width: 100%;
    margin-top: -40px;
    
    h3 {
      text-align: center;
    }
  `}
`;

export default Index;