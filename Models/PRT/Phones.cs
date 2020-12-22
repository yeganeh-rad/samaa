using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_Phones")]
    public class Phones{
        public int ID{get;set;}
        public string phoneNo{get;set;}
        public PhoneLocations phoneLocations{get;set;}
    }
}