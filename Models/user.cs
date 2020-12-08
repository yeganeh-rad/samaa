using System;
using System.Collections.Generic;

namespace sama.Models
{
    public class user
    {
        public int ID{get;set;}
        public string nin{get;set;}
        public string name{get;set;}
        public string family{get;set;}
        public int birthDate{get;set;}
        public string birthCity{get;set;}
        public int birthNumber{get;set;}
        public char gender{get;set;}
        public string fatherName{get;set;}
        public string eMail{get;set;}
        public string address{get;set;}
        public string country{get;set;}
        public string city{get;set;}
        public string town{get;set;}
        public int registrationID{get;set;}

        public string postalCode{get;set;}
        public ICollection<phone> phone{get;set;}
        public ICollection<requestPerson> requestPerson{get;set;}
        


        }
}