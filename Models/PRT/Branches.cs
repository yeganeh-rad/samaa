using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_Branches")]
    public class Branches{
        public int ID{get;set;}
        public string bankName{get;set;}
        public string branchName{get;set;}

    }
}