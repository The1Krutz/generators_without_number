import jetSchema from 'jet-schema';
import { isNumber, isString, isBoolean } from 'jet-validators';
import { isRelationalKey, isWnSystemEnumVal } from './validators';
import { WnSystem } from '@src/models/enums';

export default jetSchema({
  globals: [
    { vf: isRelationalKey, default: -1 },
    { vf: isNumber, default: 0 },
    { vf: isString, default: '' },
    { vf: isBoolean, default: false },
    { vf: isWnSystemEnumVal, default: WnSystem.Stars },
  ],
});
