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
                //check if seeded
                if (context.usernames.Any()){return;}
                //seed usernames
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
                
                if(context.User.Any()){return;}
                //seeding
                context.User.AddRange(
                    new Models.user{
                        name="آرش",
                        family="یگانه راد",
                        nin="3873592740",
                        birthCity="همدان",
                        birthDate=630606,
                        birthNumber=1399,
                        gender='m',
                        fatherName="احمد",
                        eMail="keremlin@yahoo.com",
                        address="تهران ستارخان خ فریدون شهر پلاک ۳",
                        postalCode="786786787"               
                    },
                    new Models.user{
                        name="آر",
                        family="یگان",
                        nin="3833592740",
                        birthCity="همدان",
                        birthDate=640606,
                        birthNumber=1349,
                        gender='m',
                        fatherName="احمد",
                        eMail="kereemlin@yahoo.com",
                        address="تهران ستارخان خ فریدون شهر پلاک ۳",
                        postalCode="67867867678"               
                    },
                    new Models.user{
                        name="سارا",
                        family="راد",
                        nin="3873592741",
                        birthCity="همدان",
                        birthDate=660606,
                        birthNumber=1369,
                        gender='F',
                        fatherName="احمد",
                        eMail="kerdemlin@yahoo.com",
                        address="تهران ستارخان خ فریدون شهر پلاک ۳",
                        postalCode="45345345344"               
                    }

                );
                context.SaveChanges();

            }
        }
    }
}