import { isNumber, isString } from 'jet-validators';

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
  // using db id so we can fetch these more directly
  strength: number;
  virtue: number;
  flaw: number;
  problem: number;
  desire: number;
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
  virtue: isNumber,
  flaw: isNumber,
  problem: isNumber,
  desire: isNumber,
});
