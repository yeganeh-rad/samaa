using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
[Table("PRT_ScoringFiles")]
    public class ScoringFiles{
        public int ID{get;set;}
        public ICollection<Requests> requests{get;set;}
        public string createDateTime{get;set;}
        public string commitDateTime{get;set;}
        public bool IsLawFirm{get;set;}
        public Branches branches{get;set;}
        public ScoringFileStatus scoringFileStatus{get;set;}
        public string trackingCode{get;set;}
        public ICollection<PersonalCustomers> personalCustomers{get;set;}
    }
}