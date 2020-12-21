using System.Collections.Generic;

namespace sama.Models{
    public class PRT_ScoringFiles{
        public int ID{get;set;}
        public ICollection<PRT_Requests> requests{get;set;}
        public string createDateTime{get;set;}
        public string commitDateTime{get;set;}
        public bool IsLawFirm{get;set;}
        public PRT_Branches branches{get;set;}
        public PRT_ScoringFileStatus scoringFileStatus{get;set;}
        public string trackingCode{get;set;}
        public ICollection<PRT_PersonalCustomers> personalCustomers{get;set;}
    }
}