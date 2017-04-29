using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Karteikarten_Webapi.Karteikarten.Models
{
    public class Karteikarte
    {
        public Karteikarte()
        {
            this.KarteiSessions = new HashSet<KarteiSession>();
        }

        public int KarteikarteId { get; set; }
        public string Input { get; set; }
        public string Output { get; set; }
        public string InputLang { get; set; }
        public string OutputLang { get; set; }


        public string InputLangShort { get; set; }
        public string InputLangLong { get; set; }


        public string OutputLangShort { get; set; }
        public string OutputLangLong { get; set; }

        public virtual ICollection<KarteiSession> KarteiSessions { get; set; }
    }
}