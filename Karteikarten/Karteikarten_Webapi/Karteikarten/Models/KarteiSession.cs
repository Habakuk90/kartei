using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Karteikarten_Webapi.Karteikarten.Models;

namespace Karteikarten_Webapi.Karteikarten.Models
{
    public class KarteiSession
    {
        public KarteiSession()
        {
            this.Karteikartes = new HashSet<Karteikarte>();
            this.User = new HashSet<UserModel>();
        }
        public int KarteiSessionId { get; set; }

        public string Name { get; set; }

        public List<string> UserName { get; set; }

        public virtual ICollection<Karteikarte> Karteikartes { get; set; }

        public virtual ICollection<UserModel> User { get; set; }
    }
}