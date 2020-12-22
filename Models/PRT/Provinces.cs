using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_Provinces")]
    public class Provinces{
        public int ID{get;set;}
        public string name{get;set;}
        public Countries countries{get;set;}
    }
}