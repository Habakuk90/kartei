namespace Karteikarten_Webapi.Migrations
{
    using Karteikarten_Webapi.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Karteikarten.WebApi.Infrastructure.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(Karteikarten.WebApi.Infrastructure.ApplicationDbContext context)
        {
        }
    }
}
