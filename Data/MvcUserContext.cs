using Microsoft.EntityFrameworkCore;
using sama.Models;

namespace sama.Data
{
    public class MvcUserContext : DbContext
    {
        public MvcUserContext (DbContextOptions<MvcUserContext> options)
            : base(options)
        {
        }

        public DbSet<user> User { get; set; }
        public DbSet<PRT_ScoringFiles> scoringFiles { get; set; }
        public DbSet<PRT_Addresses> Addresses { get; set; }
        public DbSet<PRT_AddressLocations> AddressLocations { get; set; }
        public DbSet<PRT_Branches> branches { get; set; }
        public DbSet<PRT_Cities> cities { get; set; }
        public DbSet<PRT_Countries> countries { get; set; }
        public DbSet<PRT_Educations> educations { get; set; }
        public DbSet<PRT_PersonalCustomers> personalCustomers { get; set; }
        public DbSet<PRT_PhoneLocations> phoneLocations { get; set; }
        public DbSet<PRT_Phones> phone { get; set; }
        public DbSet<PRT_Provinces> provinces { get; set; }
        public DbSet<PRT_Requests> requests { get; set; }
        public DbSet<PRT_RequestTypes> requestTypes { get; set; }
        public DbSet<PRT_ScoringFileStatus> scoringFileStatus { get; set; }
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