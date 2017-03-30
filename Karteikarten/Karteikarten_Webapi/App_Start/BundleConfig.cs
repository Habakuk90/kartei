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
                        "~/Scripts/jquery-{version}.js"));
            
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

        }
    }
}