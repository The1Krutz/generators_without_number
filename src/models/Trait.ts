import { isNumber, isOptionalString, isString } from 'jet-validators';

import schema from '@src/models/schema/schema';
import {
  isRelationalKey,
  isWnSystemEnumVal,
  isWnTraitTypeEnumVal,
} from '@src/models/schema/validators';
import { TraitType, WnSystem } from './enums';

/**
 * Types
 */

// specifically for traits that do not have a title, ie: virtue or flaws
export interface ITrait {
  id: number;
  created: Date;
  system: WnSystem;
  type: TraitType;
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
  type: isWnTraitTypeEnumVal,
  title: isOptionalString,
  description: isString,
});
