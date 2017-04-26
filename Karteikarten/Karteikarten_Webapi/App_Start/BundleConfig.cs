using System.Web;
using System.Web.Optimization;

namespace Karteikarten_Webapi
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            
            // Examples
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.2.1.min.js").Include("~/Scripts/auth.js"));
            
            bundles.Add(new StyleBundle("~/Karteikarten/css").Include("~/Content/site.css").Include("~/Karteikarten/css/login.css"));

        }
    }
}