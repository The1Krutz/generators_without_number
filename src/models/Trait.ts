import { isNumber, isOptionalString, isString } from 'jet-validators';

import schema from '@src/util/schema';
import { isRelationalKey, isWnSystemEnumVal } from '@src/util/validators';
import { WnSystem } from './enums';

/**
 * Types
 */

// specifically for traits that do not have a title, ie: virtue or flaws
export interface ITrait {
  id: number;
  created: Date;
  system: WnSystem;

  index: number; // d20 number from the tables in the book
  title?: string;
  description: string;
}

/**
 * Setup
 */
export const Trait = schema<ITrait>({
  id: isRelationalKey,
  created: Date,
  system: isWnSystemEnumVal,

  index: isNumber,
  title: isOptionalString,
  description: isString,
});
