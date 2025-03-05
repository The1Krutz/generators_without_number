import { RouteError } from '@src/common/route-errors';
import { HttpStatusCodes } from '@src/common/HttpStatusCodes';

import { NpcRepo } from '@src/repos/NpcRepo';
import { INpc } from '@src/models/Npc';
import { getRandomInt } from '@src/util/misc';
import { TraitType, WnSystem } from '@src/models/enums';
import { traitService } from './TraitService';

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
async function addRandom(): Promise<void> {
  const strength = await traitService.getRandomByType(TraitType.NpcStrength);
  const virtue = await traitService.getRandomByType(TraitType.NpcVirtue);
  const flaw = await traitService.getRandomByType(TraitType.NpcFlaw);
  const problem = await traitService.getRandomByType(TraitType.NpcProblem);
  const desire = await traitService.getRandomByType(TraitType.NpcDesire);

  const npc: INpc = {
    id: getRandomInt(),
    created: new Date(),
    name: 'random blorgo', // todo - randomize this with actual name stuff
    system: WnSystem.Cities,
    strength: strength.id,
    virtue: virtue.id,
    flaw: flaw.id,
    problem: problem.id,
    desire: desire.id,
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
