using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace sama.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MvcUserContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<MvcUserContext>>()))
            {
                if(context.cities.Any())return;
                context.cities.AddRange(
                   
                    new Models.PRT.Cities{
                        name="کرج",
                        provinces=new Models.PRT.Provinces{
                                                            name="تهران",
                                                            countries= new Models.PRT.Countries{
                                                                                                    name="ایران"
                                                            }
                                                        },
                        ID=2
                    },
                    new Models.PRT.Cities{
                        name="ازمیر",
                        provinces=new Models.PRT.Provinces{
                                                            name="استانبول",
                                                            countries= new Models.PRT.Countries{
                                                                                                    name="ترکیه"
                                                            }
                                                        },
                        ID=3
                    }
                    ,
                    new Models.PRT.Cities{
                        name="نجف",
                        provinces=new Models.PRT.Provinces{
                                                            name="بغداد",
                                                            countries= new Models.PRT.Countries{
                                                                                                    name="عراق"
                                                            }
                                                        },
                        ID=4
                    }
                    
                );
                
                context.cities.Add(new Models.PRT.Cities{
                    name="تویسرکان",
                    provinces=new Models.PRT.Provinces{
                    name="همدان"
                    ,countries=context.countries.Where(x=>x.name=="تهران").Select(x=>x).FirstOrDefault()
                   }
                });
                if(context.educations.Any()){return;}
                context.educations.AddRange(
                    new Models.PRT.Educations{
                                                name="زیر دیپلم"
                    },new Models.PRT.Educations{
                                                name="دیپلم"
                    }
                    ,new Models.PRT.Educations{
                                                name="فوق دیپلم"
                    },new Models.PRT.Educations{
                                                name="کارشناسی"
                    }
                    ,new Models.PRT.Educations{
                                                name="کارشناسی ارشد"
                    },new Models.PRT.Educations{
                                                name="دکتری"
                    },new Models.PRT.Educations{
                                                name="بیسواد"
                    }
                );
                if(context.AddressLocations.Any()){return;}
                context.AddressLocations.AddRange(
                    new Models.PRT.AddressLocations{
                                                        name="منزل"
                    },new Models.PRT.AddressLocations{
                                                        name="محل کار"
                    },new Models.PRT.AddressLocations{
                                                        name="رابط"
                    }
                );
                if(context.phoneLocations.Any()){return;}
                context.phoneLocations.AddRange(
                    new Models.PRT.PhoneLocations{
                                                    name="منزل"
                    },new Models.PRT.PhoneLocations{
                                                    name="محل کار"
                    },new Models.PRT.PhoneLocations{
                                                    name="همراه"
                    }
                );
                context.requestTypes.AddRange(
                    new Models.PRT.RequestTypes{name="وام"},
                    new Models.PRT.RequestTypes{name="مرابحه"},
                    new Models.PRT.RequestTypes{name="سفته"},
                    new Models.PRT.RequestTypes{name="ضمانت"}
                );
                context.currencies.AddRange(
                    new Models.PRT.currency{name="ریال"},
                    new Models.PRT.currency{name="درهم"},
                    new Models.PRT.currency{name="دلار"},
                    new Models.PRT.currency{name="یورو"}
                );
                context.scoringFiles.Add(
                    new Models.PRT.ScoringFiles{
                        commitDateTime="900908"
                        ,createDateTime="900907"
                        ,IsLawFirm=false
                        ,trackingCode="0"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}