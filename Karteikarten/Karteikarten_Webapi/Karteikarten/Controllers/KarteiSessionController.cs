using System.Collections.Generic;
using Karteikarten_Webapi.Karteikarten.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Karteikarten_Webapi.Karteikarten.Helper;
using System.Web.Http.Results;
using System.Web.Helpers;

namespace Karteikarten_Webapi.Karteikarten.Controllers
{
    [RoutePrefix("api/session")]
    public class KarteiSessionController : ApiController
    {
        KarteiContext db = new KarteiContext();

        [Route("get")]
        public IQueryable<Karteikarte> GetSession(int id)
        {

            var karteiSession = db.KarteiSession
                             .Where(r => r.KarteiSessionId == id)
                             .SelectMany(x => x.Karteikartes)
                             .Distinct();
            
            return karteiSession;
        }

        // Creates a Sessio with the Given List of Karteikarten
        [HttpPost]
        [Route("create")]
        public HttpResponseMessage CreateSession(List<Karteikarte> KarteiList)
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


                context.KarteiSession.Add(newSession);
                context.SaveChanges();
            }
            return new HttpResponseMessage { StatusCode = HttpStatusCode.Created };

        }
    }
}