using System.Collections.Generic;
using Karteikarten_Webapi.Karteikarten.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Karteikarten_Webapi.Karteikarten.Helper;
using System.Web.Http.Results;
using System.Web.Helpers;
using System;
using System.Web;

namespace Karteikarten_Webapi.Karteikarten.Controllers
{
    [RoutePrefix("api/session")]
    public class KarteiSessionController : ApiController
    {
        [Route("getById")]
        public KarteiSession GetSession(int id)
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

        [Route("getByUser")]
        public List<KarteiSession> GetUserSessions(string userName)
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


        private readonly AuthRepository _repo = new AuthRepository();
        // Creates a Sessio with the Given List of Karteikarten
        [HttpPost]
        [Route("create")]
        public void CreateSession(List<Karteikarte> KarteiList)
        {
            KarteiSession newSession = new KarteiSession();
            List<Karteikarte> newKarteiList = new List<Karteikarte>();
            
            using (var context = new KarteiContext())
            {
                foreach (var item in KarteiList)
                {
                    var karteikarteFromDatabase = context.Karteikarte
                                                     .FirstOrDefault(kartei =>
                                                         kartei.InputWort == item.InputWort &&
                                                         kartei.InputLangShort == item.InputLangShort &&
                                                         kartei.OutputLangShort == item.OutputLangShort);

                    if (karteikarteFromDatabase != null)
                    {
                        newKarteiList.Add(karteikarteFromDatabase);
                    }
                    else
                    {
                        newKarteiList.Add(item);
                    }
                }

                newSession.Karteikartes = newKarteiList;
                if (string.IsNullOrWhiteSpace(newSession.Name))
                {
                    int karteiSessionCount = context.KarteiSession.Count(gaga => gaga.KarteiSessionId != 0);
                    
                    newSession.Name = "Default " + (karteiSessionCount + 1);
                }


                if (HttpContext.Current.Request.Cookies["userName"] != null)
                {
                    string userName = HttpContext.Current.Request.Cookies["userName"].Value;

                    if (!string.IsNullOrWhiteSpace(userName))
                    {
                        newSession.User = context.Users.Where(x => x.UserName == userName).ToList();
                    }
                }


                context.KarteiSession.Add(newSession);
                context.SaveChanges();
            }
        }
    }
}