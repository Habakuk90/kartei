using Karteikarten_Webapi.Karteikarten.Helper;
using Karteikarten_Webapi.Karteikarten.Models;
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

        public ActionResult Profil()
        {

            var x = Request.Cookies["userName"].Value;

            List<KarteiSession> session = HelperForDemo.GetUserSessions(x);

            return View("~/Karteikarten/Views/Session/Profil.cshtml", session);
            //return View();
        }
    }

    class HelperForDemo
    {
        public static KarteiSession GetSession(int id)
        {
            KarteiSession karteiSession = new KarteiSession();
            var user = new List<UserModel>();
            using (var context = new KarteiContext())
            {
                karteiSession = context.KarteiSession.FirstOrDefault(t => t.KarteiSessionId == id);
                karteiSession.Karteikartes = context.KarteiSession
                                 .Where(session => session.KarteiSessionId == id).SelectMany(session => session.Karteikartes)
                                 .Distinct().ToList();
                user = context.KarteiSession.Where(session => session.KarteiSessionId == id).SelectMany(x => x.User).Distinct().ToList();
            }
            karteiSession.UserName = user.Select(t => t.UserName).Distinct().ToList();
            return karteiSession;
        }

        
        public static List<KarteiSession> GetUserSessions(string userName)
        {
            List<KarteiSession> karteiSessions = new List<KarteiSession>();
            var user = new UserModel();

            using (var context = new KarteiContext())
            {
                karteiSessions = context.Users.Where(t => t.UserName == userName).SelectMany(f => f.KarteiSession).Distinct().ToList();

                for (int i = 0; i < karteiSessions.Count; i++)
                {
                    karteiSessions[i] = GetSession(karteiSessions[i].KarteiSessionId);
                }
            }
            return karteiSessions;
        }
    }
}
