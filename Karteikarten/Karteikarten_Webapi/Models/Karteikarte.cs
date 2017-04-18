using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Karteikarten_Webapi.Models
{
    public class Karteikarte
    {
        public int Id { get; set; }

        public string Input { get; set; }

        public string Output { get; set; }
       
        public string InputLang { get; set; }

        public string OutputLang { get; set; }

    }
}