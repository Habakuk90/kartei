using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Karteikarten_Webapi.Karteikarten.Models
{
    public class KarteiSession
    {
        public KarteiSession()
        {
            //this.Karteikarten = karteikarten;
            this.Karteikartes = new HashSet<Karteikarte>();
        }
        public int KarteiSessionId { get; set; }

        //public virtual List<Karteikarte> Karteikarten { get; set; }

        public virtual ICollection<Karteikarte> Karteikartes { get; set; }
    }
}