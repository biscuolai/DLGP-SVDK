//using Microsoft.AspNet.Authorization;
//using Microsoft.AspNet.Http;
//using Microsoft.AspNet.Mvc;
//using Microsoft.Net.Http.Headers;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Net.Http;

//namespace DLGP_SVDK.Web.Api
//{
//    [Authorize]
//    [Route("api/fileupload")]
//    public class FileUploaderController : Controller
//    {
//        private HttpContext context;

//        public FileUploaderController(IHttpContextAccessor contextAccessor)
//        {
//            this.context = contextAccessor.HttpContext;
//        }

//        [HttpPost]
//        public HttpResponseMessage AttachFile()
//        {
//            HttpResponseMessage result = null;
//            var httpRequest = context.Request;
//            if (httpRequest.HttpContext.Items.Count > 0)
//            {
//                var docfiles = new List<string>();
//                foreach (string file in httpRequest.HttpContext.Items)
//                {
//                    var postedFile = httpRequest.HttpContext.Items[file];
//                    string filePath = Path.GetFullPath(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.InternetCache), postedFile.FileName));
//                    postedFile.SaveAs(filePath);

//                    docfiles.Add(filePath);
//                }
//                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
//            }
//            else
//            {
//                result = Request.CreateResponse(HttpStatusCode.BadRequest);
//            }
//            return result;
//        }

//        [HttpGet]
//        public HttpResponseMessage DownLoadFile(string FileName, string fileType)
//        {
//            Byte[] bytes = null;
//            if (FileName != null)
//            {
//                string filePath = Path.GetFullPath(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.InternetCache), FileName));
//                FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
//                BinaryReader br = new BinaryReader(fs);
//                bytes = br.ReadBytes((Int32)fs.Length);
//                br.Close();
//                fs.Close();
//            }

//            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
//            MemoryStream stream = new MemoryStream(bytes);
//            result.Content = new StreamContent(stream);
//            result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(fileType);
//            result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
//            {
//                FileName = FileName
//            };
//            return (result);
//        }
//    }
//}
