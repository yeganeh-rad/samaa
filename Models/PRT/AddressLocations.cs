using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_AddressLocations")]
    public class AddressLocations{
        public int ID{get;set;}
        public string name{get;set;}
    }
}