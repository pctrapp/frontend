import { css } from 'styled-components';
import router from 'next/router';

import { SIZES } from '../atoms/constans';

export const media = Object.keys(SIZES).reduce((acc: { [k: string]: any }, label) => {
  acc[label] = (...args: any) => css`
    @media only screen and (max-width: ${SIZES[label] / 16}em) {
      ${/* @ts-ignore */ 
        css(...args)
      }
    }
  `;
  return acc
}, {});

export function isValidUsername(username: string): boolean {
  return !username.startsWith('-') 
    && !username.endsWith('-') 
    && /[a-z0-9]/.test(username)
    && username.length <= 60
    && username.length >= 3
    && username.split(' ').length === 1;
}

export function getAvatarURL(id: string, avatar: string): string {
  return `${process.env.NEXT_PUBLIC_CDN_URL}/avatars/${id}/${avatar}`;
}

export function getImageUrl(user: string, id: string, extension: string): string {
  return `${process.env.NEXT_PUBLIC_CDN_URL}/images/${user}/${id}.${extension}`;
}

export function getBannerUrl(id: string, banner: string): string {
  return `${process.env.NEXT_PUBLIC_CDN_URL}/banners/${id}/${banner}`;
}

export function redirect(path: string, res: any): void {
  if (res) {
    res.writeHead(302, { Location: path });
    res.end();
  } else {
    router.push(path);
  }
}

export function downloadTextFile(content: string, filename: string): void {
  const elt = document.createElement('a');
  elt.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  elt.setAttribute('download', filename);

  elt.style.display = 'none';
  document.body.appendChild(elt);

  elt.click();

  document.body.removeChild(elt);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}