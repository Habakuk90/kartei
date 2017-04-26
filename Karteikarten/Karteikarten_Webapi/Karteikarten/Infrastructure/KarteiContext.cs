using Karteikarten.Karteikarten_Webapi.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace Karteikarten.Karteikarten.WebApi.Infrastructure
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

    }
}