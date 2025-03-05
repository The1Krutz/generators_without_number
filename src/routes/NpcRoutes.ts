import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';

import { HttpStatusCodes } from '@src/common/HttpStatusCodes';

import { parseReq, IReq, IRes } from './common';
import { npcService } from '@src/services/NpcService';
import { Npc } from '@src/models/Npc';
import { Router } from 'express';
import { Paths } from '@src/common/Paths';

/**
 * Variables
 */

const Validators = {
  add: parseReq({ npc: Npc.test }),
  update: parseReq({ npc: Npc.test }),
  delete: parseReq({ id: transform(Number, isNumber) }),
};

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
 * Add one npc with randomly determined traits
 */
async function addRandom(_: IReq, res: IRes) {
  await npcService.addRandom();
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

// Add Npc router
const npcRouter = Router();
npcRouter.get(Paths.Npc.Get, getAll);
npcRouter.post(Paths.Npc.Add, add);
npcRouter.post(Paths.Npc.AddRandom, addRandom);
npcRouter.put(Paths.Npc.Update, update);
npcRouter.delete(Paths.Npc.Delete, delete_);
export { npcRouter };
