import { RouteError } from '@src/common/route-errors';
import { HttpStatusCodes } from '@src/common/HttpStatusCodes';

import { TraitType } from '@src/models/enums';
import { TraitRepo } from '@src/repos/TraitRepo';
import { ITrait } from '@src/models/Trait';
import { getRandomInt } from '@src/util/misc';

/**
 * Variables
 */

export const TRAIT_NOT_FOUND_ERR = 'Trait not found';

/**
 * Functions
 */

function getById(id: number) {
  return TraitRepo.getById(id);
}

function getAllByType(type: TraitType) {
  return TraitRepo.getAllByType(type);
}

function getAll() {
  return TraitRepo.getAll();
}

async function getRandomByType(type: TraitType) {
  const traits = await getAllByType(type);
  const index = getRandomInt(traits.length);

  return traits[index];
}

function add(trait: ITrait) {
  return TraitRepo.add(trait);
}

async function _delete(id: number) {
  const persists = await TraitRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, TRAIT_NOT_FOUND_ERR);
  }
  return TraitRepo.delete(id);
}

export const traitService = {
  getById,
  getAllByType,
  getAll,
  getRandomByType,
  add,
  delete: _delete,
};
