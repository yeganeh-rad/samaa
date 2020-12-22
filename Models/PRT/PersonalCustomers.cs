using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace  sama.Models.PRT{
    [Table("PRT_PersonalCustomers")]
    public class PersonalCustomers{
        public int ID{get;set;}
        public sama.Models.PRT.ScoringFiles scoringFiles{get;set;}
        public string nin{get;set;}
        public string firstName{get;set;}
        public string lastName{get;set;}
        public int birthDate{get;set;}
        public sama.Models.PRT.Cities birthPlaceCity{get;set;}
        public int certificateNO{get;set;}
        public bool gender{get;set;}
        public string fatherName{get;set;}
        public string economicCode{get;set;}
        public sama.Models.PRT.Educations education{get;set;}
        public string email{get;set;}
        public ICollection<sama.Models.PRT.Phones> phones{get;set;}
        public ICollection<sama.Models.PRT.Addresses> addresses{get;set;}
        
    }
}