using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using Karteikarten_Webapi.Karteikarten.Models;
using Karteikarten.WebApi.Karteikarten.Infrastructure;

namespace Karteikarten_Webapi.Karteikarten.Infrastructure
{
    public class AuthRepository : IDisposable
    {
        private KarteiContext _userContext;

        private UserManager<IdentityUser> _userManager;

        public AuthRepository()
        {
            _userContext = new KarteiContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_userContext));
        }

        public async Task<IdentityResult> RegisterUser(Register userModel)
        {
            IdentityUser user = new IdentityUser();

            user.UserName = userModel.UserName;

            user.Email = userModel.Email;
            
            IdentityResult result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }


        public async Task<IdentityUser> FindUser(Login loginModel)
        {
            IdentityUser user = await _userManager.FindAsync(loginModel.UserName, loginModel.Password);

            return user;
        }

        public void Dispose()
        {
            _userContext.Dispose();
            _userManager.Dispose();

        }
    }
}