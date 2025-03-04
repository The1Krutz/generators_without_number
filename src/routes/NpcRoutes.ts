import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';

import { HttpStatusCodes } from '@src/common/HttpStatusCodes';

import { parseReq, IReq, IRes } from './common';
import { npcService } from '@src/services/NpcService';
import { Npc } from '@src/models/Npc';

/**
 * Variables
 */

const Validators = {
  add: parseReq({ npc: Npc.test }),
  update: parseReq({ npc: Npc.test }),
  delete: parseReq({ id: transform(Number, isNumber) }),
} as const;

/**
 * Functions
 */

/**
 * Get all npcs.
 */
async function getAll(_: IReq, res: IRes) {
  const npcs = await npcService.getAll();
  res.status(HttpStatusCodes.OK).json({ npcs });
}

/**
 * Add one npc.
 */
async function add(req: IReq, res: IRes) {
  const { npc } = Validators.add(req.body);
  await npcService.addOne(npc);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one npc.
 */
async function update(req: IReq, res: IRes) {
  const { npc } = Validators.update(req.body);
  await npcService.updateOne(npc);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one npc.
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = Validators.delete(req.params);
  await npcService.delete(id);
  res.status(HttpStatusCodes.OK).end();
}

export const NpcRoutes = {
  getAll,
  add,
  update,
  delete: delete_,
};
