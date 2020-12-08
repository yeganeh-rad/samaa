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