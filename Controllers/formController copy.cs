using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sama.Data;
using sama.Models;
namespace  sama.Controllers 
{
    [Route("[controller]")]
    [ApiController]
    public class formController : ControllerBase{
        //pass the context that created by DI in startup class
        private readonly MvcUserContext _context;
        public formController(MvcUserContext context)
        {
            _context=context;
        }
        [HttpGet("educationList/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.Educations>>> educationList(int id)
         {
            return (await _context.educations.ToListAsync());
                
         }  
         [HttpGet("addressLocation/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.AddressLocations>>> addressLocation(int id)
         {
            return (await _context.AddressLocations.ToListAsync());
                
         }  
         [HttpGet("phoneLocation/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.PhoneLocations>>> phoneLocation(int id)
         {
            return (await _context.phoneLocations.ToListAsync());
                
         }  
         [HttpGet("requestType/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.RequestTypes>>> requestType(int id)
         {
            return (await _context.requestTypes.ToListAsync());
                
         }   
          [HttpGet("currency/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.currency>>> currency(int id)
         {
            return (await _context.currencies.ToListAsync());
                
         }   
                  
    }
    
}