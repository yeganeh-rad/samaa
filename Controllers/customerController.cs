using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sama.Data;
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
                            .Where(x=>x.scoringFiles.ID==defaultFile().ID)
                            .Select(c=>new sama.VM.customerList{
                                        family=c.lastName
                                        ,name=c.firstName
                                        ,id=c.ID
                                    })
                            .ToListAsync();
            }
            [HttpGet("edit/{customerId}")]
           public async  Task<ActionResult<sama.VM.customerVM>> getEdit(int customerId)
            {
                return await _context.personalCustomers
                                    .Where(x=>x.ID==customerId)
                                    .Include(x=>x.education)
                                    .Include(c=>c.phones)
                                    .Include(x=>x.addresses)
                                    .Include(x=>x.education)
                                    .Include(x=>x.birthPlaceCity)
                                    .Select(c=>new sama.VM.customerVM{
                                        id=c.ID,
                                        personEducation=c.education.ID,
                                        personFamily=c.lastName,
                                        personFather=c.fatherName,
                                        personGender=Convert.ToInt32(c.gender),
                                        personName=c.firstName,
                                        registrationNumber=c.certificateNO,
                                        nin=c.nin,
                                        bussinessCode=c.economicCode,
                                        dateOfBirth=c.birthDate,
                                        email=c.email,
                                        scoringFile=defaultFile().ID,//c.defaultFile().ID,
                                        addresses=c.addresses.Where(x=>x.ID>0)
                                            .Select(x=>new sama.VM.address{id=x.ID,desc=x.description,postalCode=x.zipCode,type=x.addressLocations.ID}).ToList(),
                                        phones=c.phones.Where(x=>x.ID>0).Select(x=>new VM.phone{id=x.ID,number=x.phoneNo,type=x.phoneLocations.ID}).ToList()
                                    }).FirstOrDefaultAsync();
                                    
                                    //res.phones=_context.phones.Where(x=>x.ID>0).Select(x=>new VM.phone{id=x.ID,number=x.phoneNumber,type=x.phoneType}).ToList();
            }
            
             [HttpPost("save/")]
           public async Task<ActionResult<statusVM>> save(sama.VM.customerVM item)
            {
                 if(item.id>0){
                 try{
                    var person=_context.personalCustomers.Where(x=>x.ID==item.id)
                        .Include(x=>x.addresses).Include(x=>x.phones)
                        .FirstOrDefault();
                    _context.Addresses.RemoveRange(person.addresses);
                    _context.phone.RemoveRange(person.phones);
                    
                    _context.personalCustomers.Remove(person);
                     _context.SaveChanges();
                        
                    }
                    catch(Exception ex){return new statusVM{ message="خطا در به روز رسانی",statusCode=500,error=ex.Message};}
                 }
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
                        //ID=item.id
                        scoringFiles=_context.scoringFiles.Find(defaultFile().ID)//(item.scoringFile)
                        ,nin=item.nin
                        ,firstName=item.personName
                        ,lastName=item.personFamily
                        ,birthDate=item.dateOfBirth
                        ,education=_context.educations.Find(item.personEducation)
                        ,gender=Convert.ToBoolean(item.personGender)
                        ,fatherName=item.personFather
                        ,economicCode=item.bussinessCode
                        ,email=item.email
                        ,certificateNO=item.registrationNumber
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
            [HttpPost("saveFile/")]
           public async Task<ActionResult<statusVM>> saveFile(sama.Models.PRT.ScoringFileStatus item)
            {
                try{
                    
                    if(!_context.scoringFileStatus.Any(x=>x.name=="200")){
                        _context.scoringFileStatus.Add(new Models.PRT.ScoringFileStatus{
                            name="200"
                        });
                        _context.SaveChanges();
                        
                    }
                    var rand = new Random();
                    var track=rand.Next(999999)+"";
                    sama.Models.PRT.ScoringFileStatus status200=_context.scoringFileStatus.Where(x=>x.name=="200").FirstOrDefault();
                    var file=defaultFile();//_context.scoringFiles.Find(item.ID);
                    file.trackingCode=track;
                    file.commitDateTime="13991005";
                    file.scoringFileStatus=status200;
                    _context.SaveChanges();
                    
                    return new statusVM{ message=(track),statusCode=200} ;
                     }
                catch(Exception ex){return new statusVM{ message="خطا در ذخیره سازی",statusCode=500,error=ex.Message};}
            }
             private sama.Models.PRT.ScoringFiles defaultFile(){
                return _context.scoringFiles.ToList().FirstOrDefault();
            }
            
    }
    
}