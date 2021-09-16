import { createGlobalStyle } from 'styled-components';

import { fonts } from '../assets';
import { media } from '../lib/utils';
import { colors } from './constans';

export default createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('${fonts.InterLight}');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('${fonts.InterRegular}');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('${fonts.InterMedium}');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('${fonts.InterSemiBold}');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('${fonts.InterBold}');
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-weight: inherit;
  }

  *::selection {
    background-color: ${colors.BRAND}4D;
  }

  ::-webkit-scrollbar {
    background-color: ${colors.PRIM_BG};
    width: 5px;
    height: 5px;
  }
  
  ::-webkit-scrollbar-thumb:window-inactive,
  ::-webkit-scrollbar-thumb {
    background: #595959;
    border-radius: 5px;
    opacity: 0.5;
  }

  h1, h2, h3, h4, h5 {

    &::selection {
      background-color: ${colors.BRAND}80;
    }
  }

  html {
    // So that 1rem = 10px since default in browsers is 1rem = 16px.
    // 10px/16px = 62.5%
    font-size: 62.5%;
    line-height: 1.5;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    color: ${colors.PRIM_TEXT_COLOR};

    ${media.sizeI`
      font-size: 57%;
    `}
    
    ${media.sizeII`
      font-size: 50.5%;
    `}
  }

  body {
    font-size: 1.4rem;
    background: ${colors.PRIM_BG};
  }

  ul {
    list-style-type: none;
  }

  .__react_component_tooltip {
    border-radius: 5px !important;
    box-shadow: ${colors.BOX_SHADOW};
    color: rgba(255, 255, 255, .8) !important;
  }

  b {
    font-weight: 500;
  }
`;