import { getRandomInt } from '@src/util/misc';

import { JsonOrm } from './JsonOrm';
import { INpc } from '@src/models/Npc';

/**
 * Functions
 */

/**
 * Get one npc.
 */
async function getOne(id: number): Promise<INpc | null> {
  const db = await JsonOrm.openDb();
  for (const npc of db.npcs) {
    if (npc.id === id) {
      return npc;
    }
  }
  return null;
}

/**
 * See if an npc with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await JsonOrm.openDb();
  for (const npc of db.npcs) {
    if (npc.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all npcs.
 */
async function getAll(): Promise<INpc[]> {
  const db = await JsonOrm.openDb();
  return db.npcs;
}

/**
 * Add one npc.
 */
async function add(npc: INpc): Promise<void> {
  const db = await JsonOrm.openDb();
  npc.id = getRandomInt();
  db.npcs.push(npc);
  return JsonOrm.saveDb(db);
}

/**
 * Update an npc.
 */
async function update(npc: INpc): Promise<void> {
  const db = await JsonOrm.openDb();
  for (let i = 0; i < db.npcs.length; i++) {
    if (db.npcs[i].id === npc.id) {
      const dbNpc = db.npcs[i];
      db.npcs[i] = {
        ...dbNpc,
        name: npc.name,
        strength: npc.strength,
      };
      return JsonOrm.saveDb(db);
    }
  }
}

/**
 * Delete one npc.
 */
async function delete_(id: number): Promise<void> {
  const db = await JsonOrm.openDb();
  for (let i = 0; i < db.npcs.length; i++) {
    if (db.npcs[i].id === id) {
      db.npcs.splice(i, 1);
      return JsonOrm.saveDb(db);
    }
  }
}

// **** Unit-Tests Only **** //

/**
 * Delete every npc record.
 */
async function deleteAllNpcs(): Promise<void> {
  const db = await JsonOrm.openDb();
  db.npcs = [];
  return JsonOrm.saveDb(db);
}

/**
 * Insert multiple npcs. Can't do multiple at once cause using a plain file
 * for now.
 */
async function insertMult(npcs: INpc[] | readonly INpc[]): Promise<INpc[]> {
  const db = await JsonOrm.openDb(),
    npcsF = [...npcs];
  for (const npc of npcsF) {
    npc.id = getRandomInt();
    npc.created = new Date();
  }
  db.npcs = [...db.npcs, ...npcs];
  await JsonOrm.saveDb(db);
  return npcsF;
}

export const NpcRepo = {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  deleteAllNpcs,
  insertMult,
};
