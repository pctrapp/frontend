import { FC, useState } from 'react';
import styled from 'styled-components';

import { icons } from '../assets';
import { colors, typography } from '../atoms/constans';
import { ALERT } from '../core/events';
import { IFile } from '../types';
import Spinner from './Spinner';
import core from '../core';
import { getCookie } from '../lib/cookie';

interface Props extends IFile {
  username?: string,
  onDelete: () => void,
}

const File: FC<Props> = ({ file, response, username = 'guest', onDelete }) => {
  const [loading, setLoading] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(`https://${username !== 'guest' ? `${username}.` : ''}pctr.app/${response?.slug}`);
    ALERT.emit({ title: 'Link copied', type: 'success' });
  }

  async function deleteImage() {
    if (loading) return;
    setLoading(true);

    const res = await core.api
      .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', null)}` } } })
      .delete(`images/${response?.slug}`);

    if (res.status !== 204) {
      ALERT.emit({ title: res.data.message, type: 'error' });
      setLoading(false);
    } else {
      setLoading(false);
      onDelete();
    }
  }

  return (
    <FileWrapper>
      <FileHeader>
        <FlexBox>
          <icons.image />
          <typography.span 
            margin="0 0 0 .75rem" 
            color={colors.PRIM_TEXT_COLOR}>{file.name}</typography.span>
        </FlexBox>
        <FlexBox>
          {response === undefined 
            ?
              <Spinner />
            :
              <Status success={response.slug !== undefined}>
                {response.slug !== undefined 
                  ?
                    <icons.check />
                  :
                    <icons.error />
                  }
              </Status>
            }
        </FlexBox>
      </FileHeader>
      {response &&
        <FileBody>
          <FlexBox>
            <Link href={`${username}/${response.slug}`} target="_blank">
              /{username}/
              {response.slug}
            </Link>
          </FlexBox>
          <FlexList>
            <li onClick={copyLink}>
              <IconBtn>
                <icons.copy />
              </IconBtn>
            </li>
            <li>
              <IconBtn href={`https://${username !== 'guest' ? `${username}.` : ''}pctr.app/${response.slug}`} target="_blank">
                <icons.externalLink />
              </IconBtn>
            </li>
            {username !== 'guest' &&
              <li onClick={deleteImage}>
                <IconBtn isDelete={true} isLoading={loading}>
                  {loading 
                    ?
                      <Spinner />
                    :
                      <icons.trash />
                    }
                </IconBtn>
              </li>
            }
          </FlexList>
        </FileBody>
      }
    </FileWrapper>
  )
}

const FileWrapper = styled.div`
  background: ${colors.SEC_BG};
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
`;

const FileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: rgba(0, 0, 0, .2);
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    stroke: ${colors.BRAND};
  }
`;

const Status = styled('div')<{ success: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid ${({ success }) => success ? colors.GREEN : colors.RED};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    stroke: ${({ success }) => success ? colors.GREEN : colors.RED};
  }
`;

const FileBody = styled.div`
  background: rgba(0, 0, 0, .1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const Link = styled('a')`
  cursor: pointer;
  color: ${colors.SEC_TEXT_COLOR};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FlexList = styled.ul`
  display: flex;

  li {
    margin-left: .75rem;
  }
`;

const IconBtn = styled('a')<{ isDelete?: boolean, isLoading?: boolean }>`
  text-decoration: underline;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: background 200ms;
  background: ${({ isLoading }) => isLoading ? `${colors.RED}4D` : ''};

  &:hover {
    background: ${({ isDelete }) => isDelete ? `${colors.RED}4D` : 'rgba(255, 255, 255, .1)'};

    svg {
      stroke: ${({ isDelete }) => isDelete ? colors.RED : colors.PRIM_TEXT_COLOR};
    }
  }

  svg {
    stroke: ${colors.SEC_TEXT_COLOR};
    transition: stroke 200ms;
    width: 13px;
  }
`;

export default File;