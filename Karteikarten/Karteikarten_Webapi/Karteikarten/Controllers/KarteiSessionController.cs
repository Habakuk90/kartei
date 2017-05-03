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

namespace Karteikarten_Webapi.Karteikarten.Controllers
{
    [RoutePrefix("api/session")]
    public class KarteiSessionController : ApiController
    {
        [Route("get")]
        public KarteiSession GetSession(int id)
        {
            KarteiSession karteiSession = new KarteiSession();

            using (var context = new KarteiContext())
            {
                karteiSession = context.KarteiSession.FirstOrDefault(t => t.KarteiSessionId == id);
                karteiSession.Karteikartes = context.KarteiSession
                                 .Where(session => session.KarteiSessionId == id).SelectMany(session => session.Karteikartes)
                                 .Distinct().ToList();
            }
            return karteiSession;
        }

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

                    newSession.Name = "Default" + (karteiSessionCount + 1);
                }
                context.KarteiSession.Add(newSession);
                context.SaveChanges();
            }
        }
    }
}