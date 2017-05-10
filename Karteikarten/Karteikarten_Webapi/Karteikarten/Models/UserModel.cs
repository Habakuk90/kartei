using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Karteikarten_Webapi.Karteikarten.Models
{
    public class UserModel : IdentityUser
    {

        public UserModel()
        {
            this.KarteiSession = new HashSet<KarteiSession>();
        }

        public virtual ICollection<KarteiSession> KarteiSession { get; set; }
    }
}