using System.Collections.Generic;
using Karteikarten_Webapi.Karteikarten.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Karteikarten.WebApi.Karteikarten.Infrastructure;
using Karteikarten_Webapi.Karteikarten.Helper;

namespace Karteikarten_Webapi.Karteikarten.Controllers
{
    [RoutePrefix("api/session")]
    public class KarteiSessionController : ApiController
    {
        KarteiContext db = new KarteiContext();

        public IEnumerable<Karteikarte> GetSession(int id)
        {

            return new List<Karteikarte>();
        }
        
        // Creates a Sessio with the Given List of Karteikarten
        [HttpPost]
        [Route("create")]
        public HttpResponseMessage CreateSession(List<Karteikarte> KarteiList)
        {
            KarteiSession newSession = new KarteiSession(KarteiList);
            SessionRepository _repo = new SessionRepository();
            List<Karteikarte> newKarteiList = new List<Karteikarte>();

            foreach (var item in KarteiList)
            {
                var karteikarteFromDatabase = db.Karteikarte
                                                 .SingleOrDefault(kartei =>
                                                     kartei.Input == item.Input &&
                                                     kartei.InputLang == item.InputLang &&
                                                     kartei.OutputLang == item.OutputLang);

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

            db.KarteiSession.Add(newSession);
            db.SaveChanges();

            return new HttpResponseMessage{StatusCode = HttpStatusCode.Created};

        }
    }
}