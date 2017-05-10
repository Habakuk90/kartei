using Karteikarten_Webapi.Karteikarten.Helper;
using Newtonsoft.Json.Serialization;
using Owin;
using System.Data.Entity;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Optimization;
using System.Web.Routing;

namespace Karteikarten_Webapi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration httpConfig = new HttpConfiguration();

            Database.SetInitializer<KarteiContext>(new DropCreateDatabaseIfModelChanges<KarteiContext>());

            ConfigureWebApi(httpConfig);
            //Register WebApi Routes/Config
            WebApiConfig.Register(httpConfig);
            //Register MVC non Api routes
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //Register css/js
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //allow all domains to access this domain
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.UseWebApi(httpConfig);

        }
        
        //some helper
        private void ConfigureWebApi(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}