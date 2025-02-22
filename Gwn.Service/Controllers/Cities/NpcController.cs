using Microsoft.AspNetCore.Mvc;
using Cities.Lib; 

namespace Gwn.Service.Controllers;

[ApiController]
[Route("api/cities/[controller]")]
public class NpcController : ControllerBase
{
  // GET: api/<Npc>
  [HttpGet]
  public IEnumerable<Npc> Get()
  {
    return new List<Npc>(){
      new Npc("Jimbo"),
      new Npc("Bob"),
    };
  }

  // GET api/<Npc>/5 
  [HttpGet("{id}")]
  public Npc Get(int id)
  {
    return new Npc();
  }

  // POST api/<Npc>
  [HttpPost]
  public void Post([FromBody] string value)
  {
  }

  // PUT api/<Npc>/5
  [HttpPut("{id}")]
  public void Put(int id, [FromBody] string value)
  {
  }

  // DELETE api/<Npc>/5
  [HttpDelete("{id}")]
  public void Delete(int id)
  {
  }
}

