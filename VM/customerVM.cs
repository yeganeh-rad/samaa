using System.Collections.Generic;

namespace sama.VM
{
    public class customerVM
    {
        public int id { get; set; }
        public string personName { get; set; }
        public string personFamily { get; set; }
        public string nin { get; set; }
        public string personFather { get; set; }
        public int registrationNumber { get; set; }
        public int dateOfBirth { get; set; }
        public int LocationOfBirth { get; set; }
        public int personGender { get; set; }
        public int personEducation { get; set; }
        public string bussinessCode { get; set; }
        public string email { get; set; }
        public int scoringFile { get; set; }
        public ICollection<phone> phones{get;set;}
        public ICollection<address> addresses{get;set;}

    }
    public class phone{
        public int id{get;set;}
        public string number{get;set;}
        public int type{get;set;}
    }
    public class address{
        public int id{get;set;}
        public int type{get;set;}
        public string postalCode{get;set;}
        public string country {get;set;}
        public string desc{get;set;}
    }
}