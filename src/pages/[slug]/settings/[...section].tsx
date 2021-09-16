import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { colors, layout } from '../../../atoms/constans';
import DefaultHead from '../../../components/DefaultHead';
import { Sidebar, Privacy, Profile, Account, Changelog, ShareX, Images } from '../../../components/settings';
import { requireSameUser } from '../../../lib/auth';
import { IUser } from '../../../types';
import NotFound from '../../404';

const tabs = ['privacy', 'account', 'changelog', 'share-x', 'profile', 'images'];

interface Props {
  user: IUser,
  section: string,
}

const Settings: NextPage<Props> = ({ user }) => {
  const router = useRouter();
  const [tab, setTab] = useState<string>();
  
  useEffect(() => {
    // @ts-ignore
    const { section: [ section ] } = router.query;    
    
    if (section) {
      if (tabs.includes((section as string).toLowerCase())) {
        setTab(section as string);
      } else {
        setTab('not-found');
      }
    }
  }, [router]);

  return (
    <>
      <DefaultHead>
        <title>{tab?.charAt(0).toUpperCase()}{tab?.slice(1)} - pctr.app</title>
      </DefaultHead>
      {tab === 'not-found' 
        ? <NotFound />
        : 
        <Container>
          <TwoColumns>
            <Sidebar selected={tab || 'profile'} username={user.username} />
            <Content>
              {tab === 'privacy' && <Privacy user={user} />}
              {tab === 'profile' && <Profile user={user} />}
              {tab === 'account' && <Account user={user} />}
              {tab === 'share-x' && <ShareX user={user} />}
              {tab === 'images' && <Images user={user} />}
              {tab === 'changelog' && <Changelog />}
            </Content>
          </TwoColumns>
        </Container>
      }
    </>
  )
}

export const getServerSideProps = requireSameUser;

const Container = styled(layout.container)`
  padding: 4rem 2vw !important;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-gap: 4rem;
`;

const Content = styled.div`
  padding: 2rem 4rem 2rem 2rem;
  background: ${colors.SEC_BG};
  box-shadow: ${colors.BOX_SHADOW};
  border-radius: 10px;
  height: max-content;
`;

export default Settings;