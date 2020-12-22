using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_Requests")]
    public class Requests{
        public int ID{get;set;}
        public int value{get;set;}
        public RequestTypes requestTypes{get;set;}
        public ScoringFiles scoringFiles{get;set;}
        public currency currency{get;set;}
    }
}