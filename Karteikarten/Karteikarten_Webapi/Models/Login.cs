using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Karteikarten_Webapi.Models
{
    public class Login
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }

    public class Register
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}