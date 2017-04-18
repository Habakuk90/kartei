using Karteikarten.WebApi.Infrastructure;
using Karteikarten_Webapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Karteikarten_Webapi.Controllers
{
    [RoutePrefix("api/kartei")]
    public class KarteikartenController : ApiController
    {
        KarteiContext db = new KarteiContext();
        
        [AllowAnonymous]
        [Route("get")]
        public IEnumerable<Karteikarte> GetKarteikarten()
        {
            IEnumerable<Karteikarte> karteikarte = null;

            {
                karteikarte = db.Karteikarte.ToList();
            }

            return karteikarte;
        }

                // GET: api/Todoes/5
        public IHttpActionResult GetKarteikarte(int id)
        {
            Karteikarte karteikarte = db.Karteikarte.Find(id);
            if (karteikarte == null)
            {
                return NotFound();
            }

            return Ok(karteikarte);
        }

        [Route("create")]
        public HttpResponseMessage SaveKartei(Karteikarte model)
        {

            db.Karteikarte.Add(model);
            db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, "succesfully stored");
        }

    }
}
