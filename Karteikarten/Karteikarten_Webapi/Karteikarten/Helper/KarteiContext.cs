using Karteikarten_Webapi.Karteikarten.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace Karteikarten.WebApi.Karteikarten.Infrastructure
{
    public class KarteiContext : IdentityDbContext<IdentityUser>
    {
        public KarteiContext()
            : base("web", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public static KarteiContext Create()
        {
            return new KarteiContext();
        }

        public DbSet<Karteikarte> Karteikarte { get; set; }
        public DbSet<KarteiSession> KarteiSession { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<KarteiSession>()
               .HasMany<Karteikarte>(s => s.Karteikartes)
               .WithMany(c => c.KarteiSessions)
               .Map(cs =>
                       {
                           cs.MapLeftKey("KarteiSessionId");
                           cs.MapRightKey("KarteikarteId");
                           cs.ToTable("KarteiSessions_Karteikartes");
                       });

            base.OnModelCreating(modelBuilder);
        }
    }

}