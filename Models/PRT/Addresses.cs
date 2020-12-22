using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_Addresses")]
    public class Addresses{
        public int ID{get;set;}
        public string description{get;set;}
        public string zipCode{get;set;}
        public AddressLocations addressLocations{get;set;}
        public  Cities cities{get;set;}
    }
}