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
        [HttpGet("countries/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.Countries>>> countries()
         {
            return (
               await 
                     _context.countries.ToListAsync()
            );
         }
        [HttpGet("provinces/{country}/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.Provinces>>> provinces(int country)
         {
            return (
               await 
                     _context.provinces
                     .Where(x=>x.countries.ID==country)
                     .Select(x=>x)
                     .ToListAsync()
            ); 
         }  
         [HttpGet("Cities/{province}/{country}")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.Cities>>> cities(int province, int country)
         {
            if (province != -1)
            {
                return (
                   await
                         _context.cities
                         .Where(x => x.provinces.ID == province)
                         .Select(x => x)
                         .ToListAsync()
                );
            }
            else
            {
               var item=_context.provinces.Where(x=>x.countries.ID==country).FirstOrDefault();
                return (
                   await
                         _context.cities
                         .Where(x => x.provinces == item)
                         .Select(x => x)
                         .ToListAsync()
                );
            }
        }
        [HttpGet("educationList/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.Educations>>> educationList()
         {
            return (await _context.educations.ToListAsync());
                
         }  
         [HttpGet("addressLocation/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.AddressLocations>>> addressLocation()
         {
            return (await _context.AddressLocations.ToListAsync());
                
         }  
         [HttpGet("phoneLocation/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.PhoneLocations>>> phoneLocation()
         {
            return (await _context.phoneLocations.ToListAsync());
                
         }  
         [HttpGet("requestType/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.RequestTypes>>> requestType()
         {
            return (await _context.requestTypes.ToListAsync());
                
         }   
          [HttpGet("currency/")]
         public async Task<ActionResult<ICollection<sama.Models.PRT.currency>>> currency()
         {
            return (await _context.currencies.ToListAsync());
                
         }   
                  
    }
    
}