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
    public class customerController : ControllerBase{
        //pass the context that created by DI in startup class
        private readonly MvcUserContext _context;
        public customerController(MvcUserContext context)
        {
            _context=context;
        }

            [HttpGet("table/{file}")]
           public async  Task<ActionResult<ICollection<sama.VM.customerList>>> getTable(int file)
            {
                
                return await _context.personalCustomers
                            .Where(x=>x.scoringFiles.ID==file)
                            .Select(c=>new sama.VM.customerList{
                                        nin=c.nin
                                        ,family=c.lastName
                                        ,name=c.firstName
                                        ,id=c.ID
                                    })
                            .ToListAsync();
            }

            
             [HttpPost("save/")]
           public async Task<ActionResult<statusVM>> save(sama.VM.customerVM item)
            {
                try{
                    var listPhone=new List<sama.Models.PRT.Phones>();
                    var listAdd=new List<sama.Models.PRT.Addresses>();
                    foreach(sama.VM.phone it in item.phones)
                    {
                        listPhone.Add(new Models.PRT.Phones{
                            phoneNo=it.number
                            ,phoneLocations=_context.phoneLocations.Find(it.type)
                        });    
                    }
                    foreach(sama.VM.address add in item.addresses){
                        listAdd.Add(new Models.PRT.Addresses{
                            addressLocations=_context.AddressLocations.Find(add.type)
                            ,description=add.desc
                            ,zipCode=add.postalCode
                            
                        });
                    }
                    _context.personalCustomers.Add(new Models.PRT.PersonalCustomers{
                        scoringFiles=_context.scoringFiles.Find(item.scoringFile)
                        ,nin=item.nin
                        ,firstName=item.personName
                        ,lastName=item.personFamily
                        ,birthDate=item.dateOfBirth
                        ,education=_context.educations.Find(item.personEducation)
                        ,gender=Convert.ToBoolean(item.personGender)
                        ,fatherName=item.personFather
                        ,economicCode=item.bussinessCode
                        ,email=item.email
                        ,phones=listPhone
                        ,addresses=listAdd
                        ,birthPlaceCity=_context.cities.Find(item.LocationOfBirth)
                    });
                    _context.SaveChanges();
                        return new statusVM{ message="با موفقیت ذخیره شد",statusCode=200} ;
                }
                catch(Exception ex){return new statusVM{ message="خطا در ذخیره سازی",statusCode=500,error=ex.Message};}
            }
            [HttpPost("delete/")]
           public async Task<ActionResult<statusVM>> delete(sama.VM.customerVM item)
            {
                try{
                    var person=_context.personalCustomers.Where(x=>x.ID==item.id)
                        .Include(x=>x.addresses).Include(x=>x.phones)
                        .FirstOrDefault();
                    _context.Addresses.RemoveRange(person.addresses);
                    _context.phone.RemoveRange(person.phones);
                    
                    _context.personalCustomers.Remove(person);
                     _context.SaveChanges();
                        return new statusVM{ message="با موفقیت حذف شد",statusCode=200} ;
                    }
                catch(Exception ex){return new statusVM{ message="خطا در ذخیره سازی",statusCode=500,error=ex.Message};}
            }
            
    }
    
}