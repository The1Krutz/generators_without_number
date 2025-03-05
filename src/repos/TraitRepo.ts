import { getRandomInt } from '@src/util/misc';

import { JsonDb } from './JsonDb';
import { ITrait } from '@src/models/Trait';
import { TraitType, WnSystem } from '@src/models/enums';

async function getById(id: number) {
  const db = await JsonDb.openDb();
  for (const trait of db.traits) {
    if (trait.id === id) {
      return trait;
    }
  }
  return null;
}

async function getAllByType(type: TraitType) {
  const db = await JsonDb.openDb();
  const filteredList: ITrait[] = [];

  for (const trait of db.traits) {
    if (trait.type === type) {
      filteredList.push(trait);
    }
  }
  return filteredList;
}

async function persists(id: number) {
  const db = await JsonDb.openDb();
  for (const trait of db.traits) {
    if (trait.id === id) {
      return true;
    }
  }
  return false;
}

async function getAll() {
  const db = await JsonDb.openDb();
  return db.traits;
}

async function add(trait: ITrait) {
  const db = await JsonDb.openDb();
  trait.id = getRandomInt();
  trait.created = new Date();
  db.traits.push(trait);
  return JsonDb.saveDb(db);
}

async function maybeAdd(trait: ITrait) {
  const db = await JsonDb.openDb();

  // early out if the trait data already exists
  if (
    db.traits.some(
      (z) =>
        z.system === trait.system &&
        z.type === trait.type &&
        z.description === trait.description &&
        z.title === trait.title
    )
  ) {
    return;
  }

  trait.id = getRandomInt();
  trait.created = new Date();
  db.traits.push(trait);
  return JsonDb.saveDb(db);
}

/**
 * Delete one npc.
 */
async function delete_(id: number): Promise<void> {
  const db = await JsonDb.openDb();
  for (let i = 0; i < db.npcs.length; i++) {
    if (db.npcs[i].id === id) {
      db.npcs.splice(i, 1);
      return JsonDb.saveDb(db);
    }
  }
}

export const TraitRepo = {
  getById,
  getAllByType,
  persists,
  getAll,
  add,
  delete: delete_,
};

/**
 * Populate default data on startup
 */
export async function onStartup() {
  // NPC Main Strength, p130
  for (const z of [
    ['Charm', 'able to persuade other NPCs and people with their winning ways'],
    ['Cunning', 'having plans for any occasion and a backup after that'],
    ['Debts', 'being owed favors by one or more important other people'],
    ['Deception', 'capable of tricking and misleading others easily'],
    ['Fame', 'being known and widely respected in their own social circles'],
    ['Family', 'related to someone of greater importance or influence'],
    ['Foresight', 'able to clearly predict the likely outcomes of current situations'],
    ['Friendship', 'being good friends with someone important or powerful'],
    ['Gear', 'possessed of high-quality cyber, weaponry, drones, or other useful equipment'],
    ['Inspiration', 'able to goad others to pursue a shared goal as if it were their own'],
    ['Luck', 'beyond any ordinary measure to a very noticeable degree'],
    ['Money', 'being unusually wealthy for someone in their position'],
    ['Prowess', 'with their physical form somehow dramatically stronger and tougher than most'],
    ['Secrets', 'privy to blackmail information or valuable knowledge hidden from most'],
    ['Skills', 'possessed of a rare or important skill to an unusual degree'],
    ['Stealth', 'very difficult to locate or follow if they don’t care to be pursued'],
    ['Ties', 'linked professionally to an organization or group that is very dangerous to offend'],
    ['Violence', 'either being personally fearsome or having ties to those who are'],
    ['Willpower', 'driven to obtain their aim with tireless, ferocious determination'],
    ['Wisdom', 'able to discern a practical path to their desires even when all is murky'],
  ]) {
    await maybeAdd({
      id: -1,
      created: new Date(),
      system: WnSystem.Cities,
      type: TraitType.NpcStrength,
      title: z[0],
      description: z[1],
    });
  }
}
