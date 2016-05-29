//using System.Collections.Generic;
//using System.Linq;

//namespace DLGP_SVDK.Identity.Model
//{
//    public class UserDisplayInfoCache : List<UserDisplayInfo>
//    {
//        private ServiceDeskUserManager Manager { get; set; }
//        public UserDisplayInfoCache(ServiceDeskUserManager manager)
//        {
//            Manager = manager;
//        }

//        //public void ClearCache()
//        //{
//        //    MemoryCache.Default.Remove("user-info-cache");
//        //}

//        public UserDisplayInfo GetUserInfo(string userId)
//        {
//            //return GetCachedUserInfo(Manager).FirstOrDefault(u => u.Id == userId);

//            return Manager.Users.Select(u => new UserDisplayInfo
//            {
//                Id = u.Id,
//                Email = u.Email,
//                DisplayName = u.DisplayName
//            }).FirstOrDefault(u => u.Id == userId);
//        }

//        //    private static IEnumerable<UserDisplayInfo> GetCachedUserInfo(UserManager<ServiceDeskUser, string> manager)
//        //    {
//        //        const string key = "user-info-cache";
//        //        //var cache = MemoryCache.Default;
//        //        var cacheCollection = cache[key] as IEnumerable<UserDisplayInfo>;

//        //        if (cacheCollection == null)
//        //        {
//        //            var policy = new CacheItemPolicy { AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(15d) };

//        //            cacheCollection = manager.Users.Select(u => new UserDisplayInfo
//        //            {
//        //                Id = u.Id,
//        //                Email = u.Email,
//        //                DisplayName = u.DisplayName
//        //            }).ToList();
//        //            cache.Add(key, cacheCollection, policy);
//        //        }
//        //        return cacheCollection;
//        //    }
//        //}
//    }

//    public class UserDisplayInfo
//    {
//        public string Id { get; set; }
//        public string Email { get; set; }
//        public string DisplayName { get; set; }
//    }
//}
