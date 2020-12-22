using System.ComponentModel.DataAnnotations.Schema;

namespace sama.Models.PRT{
    [Table("PTR_currency")]
    public class currency{
        public string name{get;set;}
        public int ID{get;set;}
    }
}