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

async function getAll() {
  const db = await JsonDb.openDb();
  return db.traits;
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
  /**
   * traits with titles
   */
  for (const z of [
    // NPC Main Strength, p130
    [TraitType.NpcStrength, 'Charm', 'able to persuade other NPCs and people with their winning ways'],
    [TraitType.NpcStrength, 'Cunning', 'having plans for any occasion and a backup after that'],
    [TraitType.NpcStrength, 'Debts', 'being owed favors by one or more important other people'],
    [TraitType.NpcStrength, 'Deception', 'capable of tricking and misleading others easily'],
    [TraitType.NpcStrength, 'Fame', 'being known and widely respected in their own social circles'],
    [TraitType.NpcStrength, 'Family', 'related to someone of greater importance or influence'],
    [TraitType.NpcStrength, 'Foresight', 'able to clearly predict the likely outcomes of current situations'],
    [TraitType.NpcStrength, 'Friendship', 'being good friends with someone important or powerful'],
    [TraitType.NpcStrength, 'Gear', 'possessed of high-quality cyber, weaponry, drones, or other useful equipment'],
    [TraitType.NpcStrength, 'Inspiration', 'able to goad others to pursue a shared goal as if it were their own'],
    [TraitType.NpcStrength, 'Luck', 'beyond any ordinary measure to a very noticeable degree'],
    [TraitType.NpcStrength, 'Money', 'being unusually wealthy for someone in their position'],
    [TraitType.NpcStrength, 'Prowess', 'with their physical form somehow dramatically stronger and tougher than most'],
    [TraitType.NpcStrength, 'Secrets', 'privy to blackmail information or valuable knowledge hidden from most'],
    [TraitType.NpcStrength, 'Skills', 'possessed of a rare or important skill to an unusual degree'],
    [TraitType.NpcStrength, 'Stealth', 'very difficult to locate or follow if they don’t care to be pursued'],
    [
      TraitType.NpcStrength,
      'Ties',
      'linked professionally to an organization or group that is very dangerous to offend',
    ],
    [TraitType.NpcStrength, 'Violence', 'either being personally fearsome or having ties to those who are'],
    [TraitType.NpcStrength, 'Willpower', 'driven to obtain their aim with tireless, ferocious determination'],
    [TraitType.NpcStrength, 'Wisdom', 'able to discern a practical path to their desires even when all is murky'],
  ] as [TraitType, string, string][]) {
    await maybeAdd({
      id: -1,
      created: new Date(),
      system: WnSystem.Cities,
      type: z[0],
      title: z[1],
      description: z[2],
    });
  }

  /**
   * traits with no titles
   */
  for (const z of [
    [TraitType.NpcVirtue, 'Always keeps the spirit of their bargains'],
    [TraitType.NpcVirtue, 'Avoids lying in all but dire circumstances'],
    [TraitType.NpcVirtue, 'Cherishes an idealistic dream'],
    [TraitType.NpcVirtue, 'Courage of unusual degree'],
    [TraitType.NpcVirtue, 'Devoted to their family'],
    [TraitType.NpcVirtue, 'Exceptionally kind to the weak'],
    [TraitType.NpcVirtue, 'Extremely fastidious about their duties'],
    [TraitType.NpcVirtue, 'Extremely trustworthy to friends'],
    [TraitType.NpcVirtue, 'Forgiving temperament, even if unwise'],
    [TraitType.NpcVirtue, 'Generous even when it is difficult'],
    [TraitType.NpcVirtue, 'Has an excellent sense of humor'],
    [TraitType.NpcVirtue, 'Hates underhanded schemes and plots'],
    [TraitType.NpcVirtue, 'Incorrupt about their given responsibilities'],
    [TraitType.NpcVirtue, 'Is a good, trustworthy leader to minions'],
    [TraitType.NpcVirtue, 'Keeps calm even under intense pressure'],
    [TraitType.NpcVirtue, 'Loyal subordinate to their chosen leader'],
    [TraitType.NpcVirtue, 'Never backs down from a promise'],
    [TraitType.NpcVirtue, 'Patient when taxed or annoyed'],
    [TraitType.NpcVirtue, 'Self-sacrificing for what they believe in'],
    [TraitType.NpcVirtue, 'Thoughtful and not given to quick anger'],

    [TraitType.NpcFlaw, 'Accepts bribes or considerations'],
    [TraitType.NpcFlaw, 'Addicted to a drug or indulgence'],
    [TraitType.NpcFlaw, 'Blames their failures on something else'],
    [TraitType.NpcFlaw, 'Careless and sloppy with their duties'],
    [TraitType.NpcFlaw, 'Easily breaks promises to others'],
    [TraitType.NpcFlaw, 'Easily led astray by a pretty face'],
    [TraitType.NpcFlaw, 'Exceptionally greedy despite its dangers'],
    [TraitType.NpcFlaw, 'Has fits of violent anger'],
    [TraitType.NpcFlaw, 'Irrational hatred for a class or type'],
    [TraitType.NpcFlaw, 'Leaves a trail of mistreated lovers'],
    [TraitType.NpcFlaw, 'Lies even when it’s not terribly useful'],
    [TraitType.NpcFlaw, 'Militantly unfaithful to their partner'],
    [TraitType.NpcFlaw, 'Obsessed with a very expensive pastime'],
    [TraitType.NpcFlaw, 'Promises far more than they actually do'],
    [TraitType.NpcFlaw, 'Prone to betraying unprofitable causes'],
    [TraitType.NpcFlaw, 'Prone to fits of cowardice'],
    [TraitType.NpcFlaw, 'Reckless desire for fame and glory'],
    [TraitType.NpcFlaw, 'Spendthrift prone to getting into debt'],
    [TraitType.NpcFlaw, 'Steals even when it’s not very convenient'],
    [TraitType.NpcFlaw, 'Thoughtless with those closest to them'],

    [TraitType.NpcProblem, 'A family member or friend has a problem'],
    [TraitType.NpcProblem, 'A subordinate wants their job'],
    [TraitType.NpcProblem, 'Their kids are doing something stupid'],
    [TraitType.NpcProblem, 'Their spouse or partner is furious'],
    [TraitType.NpcProblem, 'Their superior is very displeased with them'],
    [TraitType.NpcProblem, 'They botched their last responsibility'],
    [TraitType.NpcProblem, 'They hate their current job or boss'],
    [TraitType.NpcProblem, 'They need rare or costly medical aid'],
    [TraitType.NpcProblem, 'They owe more than they can pay'],
    [TraitType.NpcProblem, 'They’re being blackmailed or coerced'],
    [TraitType.NpcProblem, 'They’re being pursued by a dire nemesis'],
    [TraitType.NpcProblem, 'They’re in dire need of money'],
    [TraitType.NpcProblem, 'They’re stifled and bored in their job'],
    [TraitType.NpcProblem, 'They’re struggling with mental trauma'],
    [TraitType.NpcProblem, 'They’ve been given a job too big for them'],
    [TraitType.NpcProblem, 'They’ve earned a dangerous foe'],
    [TraitType.NpcProblem, 'They’ve gotten addicted to something'],
    [TraitType.NpcProblem, 'They’ve inherited someone else’s problem'],
    [TraitType.NpcProblem, 'They’ve lost or had stolen a vital thing'],
    [TraitType.NpcProblem, 'They’ve made promises they can’t keep'],

    [TraitType.NpcDesire, 'They want an appealing new lover'],
    [TraitType.NpcDesire, 'They want more leisure time to themselves'],
    [TraitType.NpcDesire, 'They want more money'],
    [TraitType.NpcDesire, 'They want respect and admiration'],
    [TraitType.NpcDesire, 'They want to acquire a different job'],
    [TraitType.NpcDesire, 'They want to boost a friend’s career'],
    [TraitType.NpcDesire, 'They want to carry out a secret command'],
    [TraitType.NpcDesire, 'They want to depose their boss'],
    [TraitType.NpcDesire, 'They want to earn forgiveness'],
    [TraitType.NpcDesire, 'They want to escape their past choices'],
    [TraitType.NpcDesire, 'They want to harm an enemy organization'],
    [TraitType.NpcDesire, 'They want to indulge in pleasures'],
    [TraitType.NpcDesire, 'They want to kill some enemy'],
    [TraitType.NpcDesire, 'They want to leave their current life'],
    [TraitType.NpcDesire, 'They want to live in a different place'],
    [TraitType.NpcDesire, 'They want to obtain a particular item'],
    [TraitType.NpcDesire, 'They want to prove themselves to others'],
    [TraitType.NpcDesire, 'They want to pursue a tempting secret'],
    [TraitType.NpcDesire, 'They want to rescue someone from trouble'],
    [TraitType.NpcDesire, 'They want to take revenge on a foe'],
  ] as [TraitType, string][]) {
    await maybeAdd({
      id: -1,
      created: new Date(),
      system: WnSystem.Cities,
      type: z[0],
      description: z[1],
    });
  }
}
