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
    public class registerController : ControllerBase{
        //pass the context that created by DI in startup class
        private readonly MvcUserContext _context;
        public registerController(MvcUserContext context)
        {
            _context=context;
        }

            [HttpGet("checkRegistration/{nin}/{phone}")]
           public async Task<ActionResult<bool>> getPerson(string nin,string phone)
            {
                return false;
                user person= 
                    _context.User
                    .Where(x=>x.nin == nin )
                    .Select(x=>x)
                    .FirstOrDefault();
                if(person==null || person.ID<=0)
                    {
                        phone phone1=
                            _context.phones
                            .Where(x=>x.phoneNumber==phone)
                            .Select(x=>x)
                            .FirstOrDefault();
                        if (phone1!=null && phone1.ID>0)
                            return true;
                        else 
                            return false;
                    }
                    return true;
            }
            [HttpGet("registrationFinal/{id}")]
           public async Task<ActionResult<user>> registrationFinal(int id)
            {
                var user=_context.User.Find(id);
                var rand=new Random();
                user.registrationID=rand.Next();
                _context.User.Update(user);
                _context.SaveChanges();

                return user;
            }
            [HttpGet("getUserRequests/{id}")]
           public async Task<ActionResult<ICollection<requestPerson>>> getUserRequests(int id)
            {
                
                //var x=_context.User.Find(2).requestPerson.ToList();
                var result=_context.User
                                        .Where(x=>x.ID==id)
                                        .Select(x=>x.requestPerson)
                                        .ToList();
                return ( result.FirstOrDefault().ToList());                
            }
            [HttpGet("delRequest/{id}")]
           public async Task<ActionResult<bool>> delRequest(int id)
            {
                try{
                     var result=_context.requestPerson.Find(id);
                    _context.requestPerson.Remove(result);
                    _context.SaveChanges();
                }catch{
                    return false;
                }                            
                return (true);                
            }
            
            [HttpPost("saveNinAndPhone/")]
            public async Task<ActionResult<usernames>> saveNinAndPhone(user item)
            {
                
                // seearch for user
                user search = _context.User
                                            .Where(x=>x.nin==item.nin)
                                            .Select(x=>x)
                                            .FirstOrDefault();
                
                // if user not exist save user.
                if(search==null || search.ID<=0){
                     //create the user
                     _context.User.Add(item);
                    await _context.SaveChangesAsync();
                    // return new user 
                    return CreatedAtAction(nameof(getPerson), new { id = item.ID }, item);
                }

                 // else send back the current user
                 return CreatedAtAction("getUser",new {id=search.ID},search);
               
            }
             [HttpPost("savePersonal/")]
            public async Task<ActionResult<user>> savePersonal(user item)
            {
                                   
                    _context.User.Add(item);
                    _context.SaveChanges();
                
                 return CreatedAtAction("getUser",new {id=item.ID},item);
            }
            [HttpPost("saveRequest/")]
            public async Task<ActionResult<requestPerson>> saveRequest(requestPerson item)
            {
                    if(item.ID>0){
                        var user=_context.User.Find(item.ID);
                        item.user=user;
                        item.ID=0;            
                         _context.requestPerson.Add(item);
                        _context.SaveChanges();
                        item.user=null;
                    }
                    else{
                        item.user=null;
                        item.ID=0;
                        return CreatedAtAction("getUser",new {id=item.ID},item);
                    }
                    
                
                 return CreatedAtAction("getUser",new {id=item.ID},item);
            }
            [HttpPost("saveContact/")]
            public async Task<ActionResult<usernames>> saveContact(user item)
            {
                user search= _context.User
                                .Where(x=>x.ID==item.ID)
                                .Select(x=>x)
                                .FirstOrDefault();
                
                if(search!=null && search.ID>0){
                    search.eMail=item.eMail;
                    search.address=item.address;
                    search.postalCode=item.postalCode;
                                     
                    _context.User.Update(search);
                    _context.SaveChanges();
                }
                 return CreatedAtAction("getUser",new {id=search.ID},search);
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