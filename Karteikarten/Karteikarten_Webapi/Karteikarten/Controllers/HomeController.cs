using Karteikarten_Webapi.Karteikarten.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Karteikarten_Webapi.Karteikarten.Controllers
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

        public ActionResult Session(int id)
        {
            KarteiContext db = new KarteiContext();
            //List<Karteikarten> karteiSession = new List<Karteikarten_Webapi.Karteikarten.
            var karteiSession = db.KarteiSession
                     .Where(session => session.KarteiSessionId == id).Select(x=> x)
                     .SelectMany(karteiList => karteiList.Karteikartes)
                     .Distinct().ToList();

            return View("~/Karteikarten/Views/Session/Session.cshtml", karteiSession);
        }
    }
}
