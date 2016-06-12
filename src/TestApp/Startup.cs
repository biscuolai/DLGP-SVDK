using System;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using DLGP_SVDK.Services;
using AutoMapper;
using DLGP_SVDK.Model.Domain.Entities;
using DLGP_SVDK.Repository.Repositories;
using DLGP_SVDK.Repository;
using DLGP_SVDK.Infrastructure;
using DLGP_SVDK.Api.ViewModels;
using DLGP_SVDK.Repository.Common;
using DLGP_SVDK.Model.Domain.Entities.Identity;
using Microsoft.AspNet.Authentication.Cookies;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Antiforgery;
using DLGP_SVDK.Web.Extensions;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace DLGP_SVDK
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.

            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();

                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public static IConfigurationRoot Configuration { get; set; }

        private static bool IsAjaxRequest(HttpRequest request)
        {
            IReadableStringCollection query = request.Query;
            if ((query != null) && (query["X-Requested-With"] == "XMLHttpRequest"))
            {
                return true;
            }
            IHeaderDictionary headers = request.Headers;
            return ((headers != null) && (headers["X-Requested-With"] == "XMLHttpRequest"));
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<Models.ApplicationDbContext>(options =>
                    options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));

            services.AddIdentity<ApplicationUser, IdentityRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.Password.RequiredLength = 8;
                config.Cookies.ApplicationCookie.LoginPath = new PathString("/Account/Login");
                //config.Cookies.ApplicationCookie.LoginPath = "/Account/Login";
                //config.Cookies.ApplicationCookie.CookieHttpOnly = true;
                //config.Cookies.ApplicationCookie.CookieSecure = CookieSecureOption.SameAsRequest;
                config.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+ ";
                config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = ctx =>
                    {
                        if (!IsAjaxRequest(ctx.Request))
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        else
                        {
                            if (ctx.Request.Path.StartsWithSegments("/api") &&
                                ctx.Response.StatusCode == (int)HttpStatusCode.OK)
                            {
                                ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            }
                            else
                            {
                                ctx.Response.Redirect(ctx.RedirectUri);
                            }
                        }

                        return Task.FromResult(0);
                    }
                };
            })
            .AddEntityFrameworkStores<Models.ApplicationDbContext>()
            .AddDefaultTokenProviders();
            
            services.AddMvc()
                .AddJsonOptions(opt =>
                {
                    opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            // Configure Identity Options
            var antiforgeryOptionsConfig = Configuration.GetSection("AntiforgeryOptions");
            services.Configure<AntiforgeryOptions>(antiforgeryOptionsConfig);

            // Add Antiforgery services to the service container
            services.AddAntiforgery();

            // HACK: Header based Antiforgery Token won't be supported until RC2 
            var serviceDescriptor = ServiceDescriptor.Singleton(typeof(IAntiforgeryTokenStore), typeof(CustomAntiforgeryTokenStore));
            services.Replace(serviceDescriptor);

            // Add application services.
            services.AddTransient<AppContextSeedData>();
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddScoped<ITicketRepository, TicketRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();

            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");

                // For more details on creating database during deployment see http://go.microsoft.com/fwlink/?LinkID=615859
                try
                {
                    using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                        .CreateScope())
                    {
                        serviceScope.ServiceProvider.GetService<Models.ApplicationDbContext>()
                             .Database.Migrate();
                    }
                }
                catch { }
            }

            app.UseIISPlatformHandler(options => options.AuthenticationDescriptions.Clear());

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseStaticFiles();

            app.UseIdentity();

            // To configure external authentication please see http://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            Mapper.Initialize(config =>
            {
                config.CreateMap<Ticket, TicketViewModel>().ReverseMap();
            });

            var seeder = serviceProvider.GetService<AppContextSeedData>();
            await seeder.EnsureSeedDataAsync();
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
