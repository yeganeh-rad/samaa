using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_PhoneLocations")]
    public class PhoneLocations{
        public int ID{get;set;}
        public string name{get;set;}
    }
}