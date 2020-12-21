using System.Collections.Generic;

namespace  sama.Models{
    public class PRT_PersonalCustomers{
        public int ID{get;set;}
        public PRT_ScoringFiles scoringFiles{get;set;}
        public string nin{get;set;}
        public string firstName{get;set;}
        public string lastName{get;set;}
        public int birthDate{get;set;}
        public PRT_Cities birthPlaceCity{get;set;}
        public int certificateNO{get;set;}
        public bool gender{get;set;}
        public string fatherName{get;set;}
        public string economicCode{get;set;}
        public PRT_Educations education{get;set;}
        public string email{get;set;}
        public ICollection<PRT_Phones> phones{get;set;}
        public ICollection<PRT_Addresses> addresses{get;set;}
        
    }
}