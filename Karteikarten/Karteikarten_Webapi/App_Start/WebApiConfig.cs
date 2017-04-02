﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Karteikarten_Webapi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //EnableCrossSiteRequests(config);
            AddRoutes(config);
        }

        private static void AddRoutes(HttpConfiguration config)
        {

            // Web API configuration and services

            // Web API routes

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        //private static void EnableCrossSiteRequests(HttpConfiguration config)
        //{
        //    var cors = new EnableCorsAttribute(
        //        origins: "*",
        //        headers: "*",
        //        methods: "*");
        //    config.EnableCors(cors);
        //}

    }
}
