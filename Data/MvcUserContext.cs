using Microsoft.EntityFrameworkCore;
using sama.Models;
using sama.Models.PRT;

namespace sama.Data
{
    public class MvcUserContext : DbContext
    {
        public MvcUserContext (DbContextOptions<MvcUserContext> options)
            : base(options)
        {
        }

        public DbSet<user> User { get; set; }
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
        
        
        public DbSet<phone> phones{get;set;}
        public DbSet<bank> bank{get;set;}
        public DbSet<files> files{get;set;}
        public DbSet<usernames> usernames{get;set;}
        public DbSet<requestPerson> requestPerson{get;set;}
        

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
            
            //modelBuilder.Entity<user>().ToTable("user");
            //modelBuilder.Entity<phone>().ToTable("phone");
        //}
    }
}