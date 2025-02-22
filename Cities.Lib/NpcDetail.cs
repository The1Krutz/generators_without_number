public record struct NpcDetail
{
  int Id;
  string? Title;
  string Description;

  public NpcDetail(int id, string title, string description)
  {
    Id = id;
    Title = title;
    Description = description;
  }

  public NpcDetail(int id, string description) : this(id, "", description) { }
}