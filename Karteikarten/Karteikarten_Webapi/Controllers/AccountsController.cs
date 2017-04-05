using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Karteikarten_Webapi.Models;
using Karteikarten_Webapi.Infrastructure;
using System.Net.Http.Headers;
using System.Net.Http;
using System;
using System.Net;
using Microsoft.AspNet.Identity.EntityFramework;



namespace Karteikarten_Webapi.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {

        private readonly AuthRepository _repo = new AuthRepository();

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(Login loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (loginModel == null)
            {
                // Abfangen bidde;
            }

            IdentityResult result = await _repo.RegisterUser(loginModel);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }


        //
        // POST: /api/Account/Login
        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IHttpActionResult> Login(Login loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (loginModel == null)
            {
                return NotFound();
            }

            IdentityUser user = await _repo.FindUser(loginModel.UserName, loginModel.Password);

            if (user != null)
            {
                // Wenn User vorhanden dann mach irgendwas; i.e. Set Cookie into Response Header 
                return ResponseMessage(SetCookie(user));
            }
            else
            {
                return NotFound(); // TODO: vernünftige response wenn nicht vorhanden
            }

            return Ok();
        }

        [HttpPost]
        [Route("Logout")]
        public async Task<IHttpActionResult> Logout()
        {

            //TODO: Just delete Cookie Maybe

            return Ok();
        }


        HttpResponseMessage SetCookie(IdentityUser userModel)
        {
            var resp = new HttpResponseMessage(HttpStatusCode.Redirect);

            var cookie = new CookieHeaderValue("userName", userModel.UserName);
            cookie.Expires = DateTimeOffset.Now.AddDays(2);
            cookie.Domain = Request.RequestUri.Host;
            cookie.Path = "/";
            resp.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            //resp.Headers.Location = new Uri("http://localhost:55845");

            return resp;
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
