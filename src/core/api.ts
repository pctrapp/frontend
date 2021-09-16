import { APIConfig } from '@pulsejs/core';
import { App } from './app';

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // path: 'api',
  options: {},
} as APIConfig;

export const api = App.API(config); 