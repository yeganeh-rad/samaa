namespace sama.Models{
    public class PRT_Addresses{
        public int ID{get;set;}
        public string description{get;set;}
        public string zipCode{get;set;}
        public PRT_AddressLocations addressLocations{get;set;}
        public  PRT_Cities cities{get;set;}
    }
}