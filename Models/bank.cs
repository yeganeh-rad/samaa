using System.Collections.Generic;

namespace sama.Models{
    public class bank{
        public int ID{get;set;}
        public string name{get;set;}
        public int description{get;set;}
        public int code{get;set;}
        public char type{get;set;}
        public ICollection<bankBranch> bankBranch{get;set;}

    }
}