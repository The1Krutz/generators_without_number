import jetEnv, { num } from 'jet-env';
import { isEnumVal } from 'jet-validators';

import { NodeEnvs } from './constants';

/******************************************************************************
                                 Setup
******************************************************************************/

export const ENV = jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Port: num,
});
