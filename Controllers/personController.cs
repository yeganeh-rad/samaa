using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sama.Data;
using sama.Models;
namespace  sama.Controllers 
{
    [Route("[controller]")]
    [ApiController]
    public class personController : ControllerBase{
        //pass the context that created by DI in startup class
        private readonly MvcUserContext _context;
        public personController(MvcUserContext context)
        {
            _context=context;
        }

            [HttpGet("find/{id}")]
           public async Task<ActionResult<user>> getPerson(int id)
            {
                user person=await _context.User.FindAsync(id);
                return person;
            }

            [HttpGet("")]
           public async Task<ActionResult<ICollection<user>>> getPerson()
            {
                return ( _context.User.ToList());
            }
            
            [HttpPost]
            public async Task<ActionResult<usernames>> PostPerson(usernames todoItem)
            {
                                 return CreatedAtAction(nameof(getPerson), new { id = todoItem.ID }, todoItem);
               
            }
             [HttpPost("login/")]
           public async Task<ActionResult<usernames>> getUsernames(usernames usernames)
            {
                usernames person= _context.usernames.Where(
                    x=>x.username==usernames.username
                    ).Select(x => x).FirstOrDefault();
                if(person!=null)
                    return person;
                else 
                    return new usernames();
            }
            
    }
    
}