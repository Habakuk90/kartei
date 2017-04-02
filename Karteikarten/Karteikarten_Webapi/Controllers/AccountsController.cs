using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Karteikarten_Webapi.Models;
using Karteikarten_Webapi.Infrastructure;



namespace Karteikarten_Webapi.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {

        private readonly AuthRepository _repo = new AuthRepository();

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(ApplicationUser userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (userModel == null)
            {
                // Abfangen bidde;
            }

            IdentityResult result = await _repo.RegisterUser(userModel);

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
        public async Task<IHttpActionResult> Login(ApplicationUser userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (userModel == null)
            {
                return NotFound();
            }

            ApplicationUser user = await _repo.FindUser(userModel.UserName, userModel.Password);

            if (user != null)
            {
                // Wenn User vorhanden dann mach irgendwas; i.e. Set Cookie into Response Header 
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
