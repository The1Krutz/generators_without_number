import { isEnum, isEnumVal, isNumber, isString } from 'jet-validators';

import schema from '@src/util/schema';
import { isRelationalKey, isWnSystemEnumVal } from '@src/util/validators';
import { WnSystem } from './enums';

/**
 * Types
 */

export interface INpc {
  id: number;
  created: Date;
  system: WnSystem;
  name: string;
  strength: number; // only the index so we can look it up from the table
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
