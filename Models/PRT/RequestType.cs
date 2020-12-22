using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_RequestTypes")]
    public class RequestTypes{
        public int ID{get;set;}
        public string name{get;set;}
        
    }
}