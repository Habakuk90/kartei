using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using System.Net.Http.Headers;
using System.Net.Http;
using System;
using System.Net;
using Microsoft.AspNet.Identity.EntityFramework;
using Karteikarten_Webapi.Karteikarten.Models;
using Karteikarten_Webapi.Karteikarten.Helper;



namespace Karteikarten_Webapi.Karteikarten.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {

        private readonly AuthRepository _repo = new AuthRepository();

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(Register registerModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (registerModel == null)
            {
                // Abfangen bidde;
            }

            IdentityResult result = await _repo.RegisterUser(registerModel);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok(result);
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

            UserModel user = await _repo.FindUser(loginModel);

            if (user != null)
            {
                // Wenn User vorhanden dann mach irgendwas; i.e. Set Cookie into Response Header 
                //Request.
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


        HttpResponseMessage SetCookie(UserModel userModel)
        {
            var resp = new HttpResponseMessage(HttpStatusCode.Accepted);
            
            var cookie = new CookieHeaderValue("userName", userModel.UserName);
            cookie.Expires = DateTimeOffset.Now.AddMinutes(60);
            cookie.Domain = Request.RequestUri.Host;
            cookie.Path = "/";
            resp.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            
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
