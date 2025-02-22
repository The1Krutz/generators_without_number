
namespace Cities.Lib;

public class Npc
{
  public Guid Id { get; }
  public string? Name { get; set; }
  public NpcDetail Strength { get; set; }


  public Npc()
  {
    Id = Guid.NewGuid();
  }

  public Npc(string name) : this()
  {
    Name = name;
  }



  private static List<NpcDetail> AllNpcStrengths = new List<NpcDetail>{
    new NpcDetail(1, "Charm", "able to persuade other NPCs and people with their winning ways"),
    new NpcDetail(2, "Cunning", "having plans for any occasion and a backup after that"),
    new NpcDetail(3, "Debts", "being owed favors by one or more important other people"),
    new NpcDetail(4, "Deception", "capable of tricking and misleading others easily"),
    new NpcDetail(5, "Fame", "being known and widely respected in their own social circles"),
    new NpcDetail(6, "Family", "related to someone of greater importance or influence"),
    new NpcDetail(7, "Foresight", "able to clearly predict the likely outcomes of current situations"),
    new NpcDetail(8, "Friendship", "being good friends with someone important or powerful"),
    new NpcDetail(9, "Gear", "possessed of high-quality cyber, weaponry, drones, or other useful equipment"),
    new NpcDetail(10, "Inspiration", "able to goad others to pursue a shared goal as if it were their own"),
    new NpcDetail(11, "Luck", "beyond any ordinary measure to a very noticeable degree"),
    new NpcDetail(12, "Money", "being unusually wealthy for someone in their position"),
    new NpcDetail(13, "Prowess", "with their physical form somehow dramatically stronger and tougher than most"),
    new NpcDetail(14, "Secrets", "privy to blackmail information or valuable knowledge hidden from most"),
    new NpcDetail(15, "Skills", "possessed of a rare or important skill to an unusual degree"),
    new NpcDetail(16, "Stealth", "very difficult to locate or follow if they don’t care to be pursued"),
    new NpcDetail(17, "Ties", "linked professionally to an organization or group that is very dangerous to offend"),
    new NpcDetail(18, "Violence", "either being personally fearsome or having ties to those who are"),
    new NpcDetail(19, "Willpower", "driven to obtain their aim with tireless, ferocious determination"),
    new NpcDetail(20, "Wisdom", "able to discern a practical path to their desires even when all is murky")
  };
}
