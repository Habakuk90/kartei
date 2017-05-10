using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using Karteikarten_Webapi.Karteikarten.Models;

namespace Karteikarten_Webapi.Karteikarten.Helper
{
    public class AuthRepository : IDisposable
    {
        private KarteiContext _userContext;

        private UserManager<UserModel> _userManager;

        public AuthRepository()
        {
            _userContext = new KarteiContext();
            _userManager = new UserManager<UserModel>(new UserStore<UserModel>(_userContext));
        }

        public async Task<IdentityResult> RegisterUser(Register userModel)
        {
            UserModel user = new UserModel();

            user.UserName = userModel.UserName;

            user.Email = userModel.Email;
            
            IdentityResult result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }


        public async Task<UserModel> FindUser(Login loginModel)
        {
            UserModel user = await _userManager.FindAsync(loginModel.UserName, loginModel.Password);

            return user;
        }

        public void Dispose()
        {
            _userContext.Dispose();
            _userManager.Dispose();

        }
    }
}