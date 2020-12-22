using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PRT_Countries")]
    public class Countries{
        public int ID{get;set;}
        public string name{get;set;}
    }
}