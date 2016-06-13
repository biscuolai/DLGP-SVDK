//using Microsoft.AspNet.Mvc;
//using Microsoft.AspNet.Mvc.Filters;
//using Microsoft.AspNet.Routing;
//using System;

//public class HandleAntiForgeryError : ActionFilterAttribute, IExceptionFilter
//{
//    #region IExceptionFilter Members

//    public void OnException(ExceptionContext filterContext)
//    {
//        var exception = filterContext.Exception as Exception;
//        if (exception != null)
//        {
//            var routeValues = new RouteValueDictionary();
//            routeValues["controller"] = "Account";
//            routeValues["action"] = "Login";
//            filterContext.Result = new RedirectToRouteResult(routeValues);
//        }
//    }
//    #endregion 
//}