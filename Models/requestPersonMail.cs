using System.Collections.Generic;

namespace sama.Models{
    public class requestPersonMail{
        public int ID{get;set;}
        public int mailNumber{get;set;}
        public int mailDate{get;set;}
        public ICollection<files> files{get;set;}
        //TODO:text must be another object

    }
}