import { RouteError } from '@src/common/route-errors';
import { HttpStatusCodes } from '@src/common/HttpStatusCodes';

import { NpcRepo } from '@src/repos/NpcRepo';
import { INpc } from '@src/models/Npc';
import { getRandomInt } from '@src/util/misc';
import { WnSystem } from '@src/models/enums';

/**
 * Variables
 */

export const NPC_NOT_FOUND_ERR = 'Npc not found';

/**
 * Functions
 */

/**
 * Get all npcs.
 */
function getAll(): Promise<INpc[]> {
  return NpcRepo.getAll();
}

/**
 * Add one npc.
 */
function addOne(npc: INpc): Promise<void> {
  return NpcRepo.add(npc);
}

/**
 * Add one npc.
 */
function addRandom(): Promise<void> {
  const npc: INpc = {
    id: getRandomInt(),
    created: new Date(),
    name: 'random blorgo', // todo - randomize this with actual name stuff
    system: WnSystem.Cities,
    strength: 3, // todo - randomize this
  };
  return NpcRepo.add(npc);
}

/**
 * Update one npc.
 */
async function updateOne(npc: INpc): Promise<void> {
  const persists = await NpcRepo.persists(npc.id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, NPC_NOT_FOUND_ERR);
  }
  // Return npc
  return NpcRepo.update(npc);
}

/**
 * Delete an npc by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await NpcRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, NPC_NOT_FOUND_ERR);
  }
  // Delete npc
  return NpcRepo.delete(id);
}

export const npcService = {
  getAll,
  addOne,
  addRandom,
  updateOne,
  delete: _delete,
};
