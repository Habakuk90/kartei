using System;
using Karteikarten.WebApi.Infrastructure;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using Karteikarten_Webapi.Models;

namespace Karteikarten_Webapi.Infrastructure
{
    public class AuthRepository : IDisposable
    {
        private ApplicationDbContext _authContext;

        private UserManager<IdentityUser> _userManager;

        public AuthRepository()
        {
            _authContext = new ApplicationDbContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_authContext));
        }

        public async Task<IdentityResult> RegisterUser(Register userModel)
        {
            IdentityUser user = new IdentityUser();

            user.UserName = userModel.UserName;

            user.Email = userModel.Email;
            
            IdentityResult result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }


        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _authContext.Dispose();
            _userManager.Dispose();

        }
    }
}