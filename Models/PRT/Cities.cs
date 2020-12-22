using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_Cities")]
    public class Cities{
        public int ID{get;set;}
        public string name{get;set;}
        public Provinces provinces{get;set;}
    }
}