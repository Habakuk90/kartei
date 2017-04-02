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

        private UserManager<ApplicationUser> _userManager;

        public AuthRepository()
        {
            _authContext = new ApplicationDbContext();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_authContext));
        }

        public async Task<IdentityResult> RegisterUser(ApplicationUser userModel)
        {
            IdentityResult result = await _userManager.CreateAsync(userModel, userModel.Password);

            return result;
        }


        public async Task<ApplicationUser> FindUser(string userName, string password)
        {
            ApplicationUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _authContext.Dispose();
            _userManager.Dispose();

        }
    }
}