import { NextPage, NextPageContext } from 'next';
import React, { createRef, useState, CSSProperties, useEffect } from 'react';
import NextImage from 'next/image';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import { icons } from '../../assets';
import { colors, typography } from '../../atoms/constans';
import core from '../../core';
import { getCookie } from '../../lib/cookie';
import { formatIntoTime, formatInDateDetails } from '../../lib/time';
import { getImageUrl, getAvatarURL } from '../../lib/utils';
import { IImage } from '../../types';
import Tooltip from '../../lib/tooltip';
import Anchor from '../../components/Anchor';
import Avatar from '../../components/Avatar';

interface Props {
  image: IImage,
}

const UserImage: NextPage<Props> = ({ image }) => {
  const imageWrapperRef = createRef<HTMLDivElement>();
  const [imageStyles, setImageStyles] = useState<CSSProperties>({});
  const [big, setBig] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';    

    let size = 'auto';

    if (imageWrapperRef.current) {
      const { clientWidth, clientHeight } = imageWrapperRef.current;
      const { width, height } = image.dimensions;      

      if (width > clientWidth || height > clientHeight) {
        size = 'contain';
      }
    }
    
    setImageStyles({
      background: `url(${getImageUrl(image.created_by?.id || 'guest', image.file_id, image.file_extension)})`,
      backgroundSize: size,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    });

    return function cleanup() {
      document.body.attributes.removeNamedItem('style');
    } 
  }, []);

  function handleContextMenu(e: any) {
    if (process.env.NEXT_PUBLIC_ENV === 'production') {
      e.preventDefault();
    }
  }

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content={getImageUrl(image.created_by?.id || 'guest', image.file_id, image.file_extension)} />
        <meta property="og:image" content={getImageUrl(image.created_by?.id || 'guest', image.file_id, image.file_extension)} />
        <meta property="og:image:width" content={String(image.dimensions.width)} />
        <meta property="og:image:height" content={String(image.dimensions.height)} />
        <meta property="og:image:secure_url" content={getImageUrl(image.created_by?.id || 'guest', image.file_id, image.file_extension)} />
        <meta name="theme-color" content={colors.BRAND} />
        <meta property="og:url" content="https://pctr.app"/>
        <meta property="og:locale" content="en_EN"/>
        <meta property="og:site_name" content="pctr.app"/>
        <title>Image - pctr.app</title>
      </Head>
      <Container onContextMenu={handleContextMenu}>
        <Wrapper>
          <Details>
            <User href={image.created_by ? `/${image.created_by.username}` : ''}>
              <typography.span margin="0 .75rem 0 0" color={colors.PRIM_TEXT_COLOR}>
                <Avatar 
                  url={image.created_by?.avatar && getAvatarURL(image.created_by.id, image.created_by.avatar)}
                  width={40}
                  height={40}
                  username={image.created_by ? image.created_by.username : 'G'} />
              </typography.span>
              <div>
                <typography.pB
                  size="1.4rem"
                  margin="0 0 -.2rem 0" 
                  color={image.created_by?.staff ? colors.RED : colors.PRIM_TEXT_COLOR}>
                    {image.created_by?.username || 'Guest'}
                </typography.pB>
                <AlignCenter>
                  <icons.eye width="12px" height="12px" />
                  <typography.span 
                    margin="0 0 0 .3rem" 
                    size="1.2rem" 
                    data-for="created_at_tooltip"
                    data-tip={formatInDateDetails(image.created_at)}>
                    {Number(image.visits).toLocaleString('en')}
                    {' '}&#183;{' '}
                    {formatIntoTime(image.created_at)}
                  </typography.span>
                </AlignCenter>
              </div>
            </User>
          </Details>
          <ImageWrapper onClick={() => setBig(true)} ref={imageWrapperRef} style={imageStyles} />
        </Wrapper>
        {big &&
          <Overlay onClick={() => setBig(false)}>
            <AnimatePresence>
              <OverlayImage
                key="image"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                ref={imageWrapperRef}
                style={{ ...imageStyles, width: '80vw', height: '80vh', cursor: 'inherit' }} />
            </AnimatePresence>
          </Overlay>
        }
      </Container>
      <Tooltip id="created_at_tooltip" backgroundColor="#000" effect="solid" />
    </>
  )
}

export async function getServerSideProps({ query, req }: NextPageContext) {
  const { image, slug } = query;

  const response = await core.api
    .with({ options: { headers: { Authorization: `Bearer ${getCookie('token', req)}` } } })    
    .get(`images/${image}?namespace=${slug}`);  

  if (response.status === 200) {
    return {
      props: {
        image: response.data,
      }
    }
  }

  return {
    notFound: true,
  }
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Overlay = styled('div')`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .8);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
`;

const OverlayImage = styled(motion.div)`
  height: 400px;
  background: ${colors.SEC_BG};
  border-radius: 10px;
  cursor: zoom-in;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
`;

const ImageWrapper = styled.div`
  height: 400px;
  background: ${colors.SEC_BG};
  border-radius: 10px;
  cursor: zoom-in;
`;

const AlignCenter = styled('div')`
  display: flex;
  align-items: center;

  svg {
    color: ${colors.SEC_TEXT_COLOR};
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const User = styled(Anchor)`
  display: flex;
  align-items: center;
  text-decoration: none !important;
`;

export default UserImage;