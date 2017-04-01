using Karteikarten.WebApi.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNet.Identity;
using Karteikarten_Webapi.Models;
using Karteikarten_Webapi.Infrastructure;
using Microsoft.AspNet.Identity.EntityFramework;



namespace Karteikarten_Webapi.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private readonly AuthRepository _repo = null;
        private readonly ApplicationDbContext _authContext = new ApplicationDbContext();
        private readonly UserManager<ApplicationUser> _userManager;
        //private readonly Microsoft.AspNet.Identity.Owin.SignInManager<ApplicationUser, IEquatable<ApplicationUser>> _signInManager;

        public AccountController(AuthRepository repo, ApplicationDbContext authContext, UserManager<ApplicationUser> userManager)
        {
            _repo = new AuthRepository();
            _authContext = authContext;
            _userManager = userManager;
        }

        [Route("Get")]
        public IHttpActionResult Get()
        {
            return Ok();
        }



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
                userModel = new ApplicationUser()
                {
                    Email = "bdmin@bdmin.de",
                    UserName = "bdmin",
                    Password = "123456"
                };
            }

            IdentityResult result = await _repo.RegisterUser(userModel);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

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
