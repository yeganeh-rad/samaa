namespace sama.Models{
    public class requestPerson{
        public int ID{get;set;}
        public int requestDate{get;set;}
        public int documentDate{get;set;}
        public int monwyRequested{get;set;}
        public string description{get;set;}
        public personRequestType type{get;set;}
        public bank bank{get;set;}
        public requestPersonMail requestPersonMail{get;set;}
        public user user{get;set;}

    }
}