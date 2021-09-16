import { IUser } from '../../types';
import { App } from '../app';

const config = {
  state: {
    USER: App.State<IUser>(),
  }
};

export const auth = App.Controller(config);
