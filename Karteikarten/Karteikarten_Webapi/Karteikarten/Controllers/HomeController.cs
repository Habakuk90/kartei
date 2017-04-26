using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Karteikarten.Karteikarten_Webapi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            HttpCookie cookie = Request.Cookies["userName"];

            string text = "You Are Logged In as : ";

            if (cookie != null)
            {
                return View("~/Karteikarten/Views/Home/Index.cshtml", model: text + cookie.Value);
            }
            else
            {
                return View("~/Karteikarten/Views/Home/Index.cshtml");
            }
        }
    }
}
