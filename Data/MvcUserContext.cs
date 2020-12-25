using Microsoft.EntityFrameworkCore;
using sama.Models.PRT;

namespace sama.Data
{
    public class MvcUserContext : DbContext
    {
        public MvcUserContext (DbContextOptions<MvcUserContext> options)
            : base(options)
        {
        }
        public DbSet<ScoringFiles> scoringFiles { get; set; }
        public DbSet<Addresses> Addresses { get; set; }
        public DbSet<AddressLocations> AddressLocations { get; set; }
        public DbSet<Branches> branches { get; set; }
        public DbSet<Cities> cities { get; set; }
        public DbSet<Countries> countries { get; set; }
        public DbSet<Educations> educations { get; set; }
        public DbSet<PersonalCustomers> personalCustomers { get; set; }
        public DbSet<PhoneLocations> phoneLocations { get; set; }
        public DbSet<Phones> phone { get; set; }
        public DbSet<Provinces> provinces { get; set; }
        public DbSet<Requests> requests { get; set; }
        public DbSet<RequestTypes> requestTypes { get; set; }
        public DbSet<ScoringFileStatus> scoringFileStatus { get; set; }
        public DbSet<currency> currencies { get; set; }
  
    }
}