import { App } from './app';

import { auth } from './controllers/user';
import { api } from './api';

const core = {
  auth,
  api
}

export default App.Core(core);

export type ICore = typeof core;