using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_ScoringFileStatus")]
    public class ScoringFileStatus{
        public int ID{get;set;}
        public string name{get;set;}
        public string data{get;set;}
        
    }
}