using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Karteikarten_Webapi.Controllers
{
    public class RegisterController : Controller
    {
        // GET: Register
        public ActionResult Index()
        {
            HttpCookie cookie = Request.Cookies["userName"];

            string text = "You Are Logged In as : ";
            
            if (cookie != null)
            {
                return View(model:text + cookie.Value);
            }
            else
            {
                return View();
            }
        }
    }
}