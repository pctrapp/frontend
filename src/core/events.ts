import { App } from './app';

export interface IAlert {
  title: string,
  message?: string,
  type: 'error' | 'success' | 'info',
}

export const ALERT = App.Event<IAlert>();