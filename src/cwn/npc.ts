import { randomInt } from "node:crypto";

interface Attribute_Rename {
  title?: string;
  description: string;
}

export class Npc {
  public Name: string;
  public MainStrength: Attribute_Rename;
  // public Virtue: Attribute_Rename;
  // public Flaw: Attribute_Rename;
  // public CurrentProblem: Attribute_Rename;
  // public CurrentDesire: Attribute_Rename;

  constructor(name: string) {
    this.Name = name;

    this.MainStrength = NpcMainStrengths[randomInt(0, NpcMainStrengths.length)];
  }
}

/**
 * Move these into a better storage later
 */
const NpcMainStrengths: Attribute_Rename[] = [
  {
    title: "Charm",
    description:
      "able to persuade other NPCs and people with their winning ways",
  },
  {
    title: "Cunning",
    description: "having plans for any occasion and a backup after that",
  },
  {
    title: "Debts",
    description: "being owed favors by one or more important other people",
  },
  {
    title: "Deception",
    description: "capable of tricking and misleading others easily",
  },
  {
    title: "Fame",
    description: "being known and widely respected in their own social circles",
  },
  {
    title: "Family",
    description: "related to someone of greater importance or influence",
  },
  {
    title: "Foresight",
    description:
      "able to clearly predict the likely outcomes of current situations",
  },
  {
    title: "Friendship",
    description: "being good friends with someone important or powerful",
  },
  {
    title: "Gear",
    description:
      "possessed of high-quality cyber, weaponry, drones, or other useful equipment",
  },
  {
    title: "Inspiration",
    description:
      "able to goad others to pursue a shared goal as if it were their own",
  },
  {
    title: "Luck",
    description: "beyond any ordinary measure to a very noticeable degree",
  },
  {
    title: "Money",
    description: "being unusually wealthy for someone in their position",
  },
  {
    title: "Prowess",
    description:
      "with their physical form somehow dramatically stronger and tougher than most",
  },
  {
    title: "Secrets",
    description:
      "privy to blackmail information or valuable knowledge hidden from most",
  },
  {
    title: "Skills",
    description: "possessed of a rare or important skill to an unusual degree",
  },
  {
    title: "Stealth",
    description:
      "very difficult to locate or follow if they don’t care to be pursued",
  },
  {
    title: "Ties",
    description:
      "linked professionally to an organization or group that is very dangerous to offend",
  },
  {
    title: "Violence",
    description:
      "either being personally fearsome or having ties to those who are",
  },
  {
    title: "Willpower",
    description:
      "driven to obtain their aim with tireless, ferocious determination",
  },
  {
    title: "Wisdom",
    description:
      "able to discern a practical path to their desires even when all is murky",
  },
];
