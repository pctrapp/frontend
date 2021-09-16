import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from '../../atoms/constans';
import Anchor from '../Anchor';

interface Props {
  selected: string,
  username?: string,
}

const Sidebar: FC<Props> = ({ username, selected }) => {
  function getHref(tab: string): string {
    return `/${username}/settings/${tab}`;
  }

  return (
    <Container>
      <Label>User Settings</Label>
      <List>
        <Anchor href={getHref('profile')}>
          <ListItem selected={selected === 'profile'}>
            Profile
          </ListItem>
        </Anchor>
        <Anchor href={getHref('account')}>
          <ListItem selected={selected === 'account'}>
            Account
          </ListItem>
        </Anchor>
        <Anchor href={getHref('privacy')}>
          <ListItem selected={selected === 'privacy'}>
            Security & Privacy
          </ListItem>
        </Anchor>
      </List>
      <Seperator />
      <Label>App</Label>
      <List>
        <Anchor href={getHref('share-x')}>
          <ListItem selected={selected === 'share-x'}>
            ShareX
          </ListItem>
        </Anchor>
        <Anchor href={getHref('images')}>
          <ListItem selected={selected === 'images'}>
            Images
          </ListItem>
        </Anchor>
        {/*}
        <Anchor href={getHref('urls')}>
          <ListItem selected={selected === 'urls'}>
            URLs
          </ListItem>
        </Anchor>
        {*/}
        <Anchor href={getHref('changelog')}>
          <ListItem selected={selected === 'changelog'}>
            Changelog
          </ListItem>
        </Anchor>
      </List>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  text-transform: uppercase;
  color: ${colors.SEC_TEXT_COLOR};
  font-size: 1rem;
  font-weight: 700;
  padding-left: 1rem;
  display: block;
  margin: .75rem 0 .5rem 0;
`;

const List = styled.ul`
  margin-bottom: .75rem;

  a {
    text-decoration: none !important;
  }
`;

const ListItem = styled('li')<{ selected?: boolean }>`
  width: 100%;
  margin-bottom: .25rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 200ms;
  padding: .75rem 1rem;
  display: block;
  color: rgba(255, 255, 255, .8);

  ${({ selected }) => selected && `
    background: rgba(255, 255, 255, .05);
  `}

  &:hover {
    background: rgba(255, 255, 255, .03);
    color: ${colors.PRIM_TEXT_COLOR};
  }
`;

const Seperator = styled.hr`
  border-color: rgba(255, 255, 255, .04);
  margin: 1rem 0;
`;

export default Sidebar;