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
                context.usernames.AddRange(
                    new Models.usernames{
                        username="keremlin",
                        password="123123",
                        ID=1
                    },
                    new Models.usernames{
                        username="keremlin2",
                        password="123123",
                        ID=2
                    },
                    new Models.usernames{
                        username="keremlin3",
                        password="123123",
                        ID=3
                    }

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