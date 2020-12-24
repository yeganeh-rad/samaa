using System.Collections.Generic;
using sama.Models.PRT;
namespace sama.VM{
    public class locationVM{
        public int id{get;set;}
        public ICollection<Cities> city{get;set;}
        public ICollection<Provinces> provinces{get;set;}
        public ICollection<Countries> countries{get;set;}  
    }
}