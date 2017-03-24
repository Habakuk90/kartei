using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Karteikarten_Webapi.Models
{
    public class AuthContext : IdentityDbContext<IdentityUser>
    {
        public AuthContext()
            : base("AuthContext")
        {
            string x = "https://www.tektutorialshub.com/asp-net-identity-tutorial-basics/";
        }
    }
}