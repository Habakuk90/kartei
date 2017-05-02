
using System.Collections.Generic;
using Karteikarten_Webapi.Karteikarten.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Karteikarten_Webapi.Karteikarten.Helper;
namespace Karteikarten_Webapi.Karteikarten.Controllers
{
    [RoutePrefix("api/Kartei")]
    public class KarteikartenController : ApiController
    {
        // #### TODO BIDDE FEHLER ABFANNGEN ####



        KarteiContext db = new KarteiContext();
        [Route("getAll")]
        public IQueryable<Karteikarte> GetAll()
        {
            return db.Set<Karteikarte>();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("create")]
        public HttpResponseMessage Create(Karteikarte karteiModel)
        {
            db.Karteikarte.Add(karteiModel);
            db.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

    }

}