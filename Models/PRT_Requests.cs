namespace sama.Models{
    public class PRT_Requests{
        public int ID{get;set;}
        public int value{get;set;}
        public PRT_RequestTypes requestTypes{get;set;}
        public PRT_ScoringFiles scoringFiles{get;set;}
    }
}