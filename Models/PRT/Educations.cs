using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_Educations")]
    public class Educations{
        public int ID{get;set;}
        public string name{get;set;}
        
    }
}