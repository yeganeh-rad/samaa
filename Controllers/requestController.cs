using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sama.Data;
using sama.Models;
using sama.VM;
namespace  sama.Controllers 
{
    [Route("[controller]")]
    [ApiController]
    public class requestController : ControllerBase{
        //pass the context that created by DI in startup class
        private readonly MvcUserContext _context;
        public requestController(MvcUserContext context)
        {
            _context=context;
        }

            [HttpGet("table/{file}")]
           public async  Task<ActionResult<ICollection<sama.VM.requestList>>> getTable(int file)
            {
                
                return await _context.requests
                            .Where(x=>x.scoringFiles.ID==defaultFile().ID)
                            .Select(c=>new sama.VM.requestList{
                                        type=c.requestTypes.name
                                        ,fee=c.value.ToString()
                                        ,id=c.ID
                                    })
                            .ToListAsync();
            }
            
             [HttpPost("save/")]
           public async Task<ActionResult<statusVM>> save(sama.VM.requestVM item)
            {
                try{
                    _context.requests.Add(
                        new sama.Models.PRT.Requests{
                                                        value=item.value
                                                        ,requestTypes= _context.requestTypes.Find(item.requestType)
                                                        ,currency=_context.currencies.Find(item.currency)
                                                        ,scoringFiles=defaultFile()
                        }
                    );
                    _context.SaveChanges();
                        return new statusVM{ message="با موفقیت ذخیره شد",statusCode=200} ;
                }
                catch(Exception ex){return new statusVM{ message="خطا در ذخیره سازی",statusCode=500,error=ex.Message};}
            }
             [HttpPost("delete/")]
           public async Task<ActionResult<statusVM>> delete(sama.VM.requestVM item)
            {
                try{
                    _context.requests.Remove(_context.requests.Find(item.ID));
                     _context.SaveChanges();
                        return new statusVM{ message="با موفقیت حذف شد",statusCode=200} ;
                    }
                catch(Exception ex){return new statusVM{ message="خطا در ذخیره سازی",statusCode=500,error=ex.Message};}
            }
            private sama.Models.PRT.ScoringFiles defaultFile(){
                return _context.scoringFiles.ToList().FirstOrDefault();
            }
    }
    
    
}