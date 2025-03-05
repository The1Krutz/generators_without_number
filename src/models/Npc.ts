import { isEnum, isEnumVal, isNumber, isString } from 'jet-validators';

import schema from '@src/models/schema/schema';
import { isRelationalKey, isWnSystemEnumVal } from '@src/models/schema/validators';
import { WnSystem } from './enums';

/**
 * Types
 */

export interface INpc {
  id: number;
  created: Date;
  system: WnSystem;
  name: string;
  strength: number; // db id so we can fetch it more directly
}

/**
 * Setup
 */
export const Npc = schema<INpc>({
  id: isRelationalKey,
  created: Date,
  system: isWnSystemEnumVal,
  name: isString,
  strength: isNumber,
});
