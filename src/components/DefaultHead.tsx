import Head from 'next/head';
import React, { FC } from 'react';

import { colors, pr } from '../atoms/constans';

const DefaultHead: FC = ({ children }) => {
  return (
    <Head>
      <title>Share Images and Screenshots</title>
      <meta name="robots" content="index, follow, archive" key="robots" />
      <meta name="theme-color" content={colors.BRAND} key="theme-color" />
      <meta property="og:url" content="https://pctr.app" key="url" />
      <meta property="og:title" content="pctr.app" key="title" />
      <meta property="og:description" content={pr.description} key="description" />
      <meta property="og:type" content="website" key="type" />
      <meta property="og:locale" content="en_EN" key="locale" />
      <meta property="og:site_name" content="pctr.app" key="site-name" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" type="image/png" href="https://cdn.pctr.app/assets/pctr_app_pb_transparent.png" />

      {children}
    </Head>
  )
}

export default DefaultHead;