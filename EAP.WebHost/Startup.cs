using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using EAP.WebHost.Models;
using EAP.WebHost.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using OpenIddict.Models;
using Microsoft.AspNetCore.Identity;
using OpenIddict;
using NWebsec.Middleware;

namespace EAP.WebHost
{
    public class Startup
    {
        public static void Main(string[] args)
        {
            try
            {
                var application = new WebHostBuilder()
                   .UseCaptureStartupErrors(captureStartupError: true)
                   .UseDefaultConfiguration(args)
                   .UseIISPlatformHandlerUrl()
                   .UseServer("Microsoft.AspNetCore.Server.Kestrel")
                   .UseStartup<Startup>()
                   .Build();

                application.Run();
            }
            catch (Exception ex)
            {

            }
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();

            services.AddMvc();

            //services.AddSwaggerGen();

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            var factory = app.ApplicationServices.GetRequiredService<ILoggerFactory>();
            factory.AddConsole();
            factory.AddDebug();

            if (env.IsDevelopment())
            {
                //app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                //app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseOAuthValidation();
            // Alternatively, you can also use the introspection middleware.
            // Using it is recommended if your resource server is in a
            // different application/separated from the authorization server.
            // 
            // app.UseOAuthIntrospection(options => {
            //     options.AutomaticAuthenticate = true;
            //     options.AutomaticChallenge = true;
            //     options.Authority = "http://localhost:54540/";
            //     options.Audience = "resource_server";
            //     options.ClientId = "resource_server";
            //     options.ClientSecret = "875sqd4s5d748z78z7ds1ff8zz8814ff88ed8ea4z4zzd";
            // });

            app.UseIdentity();

            // Note: OpenIddict must be added after
            // ASP.NET Identity and the external providers.
            app.UseOpenIddict(options =>
            {
                // You can customize the default Content Security Policy (CSP) by calling UseNWebsec explicitly.
                // This can be useful to allow your HTML views to reference remote scripts/images/styles.
                options.UseNWebsec(directives =>
                {
                    directives.ChildSources(directive => directive.Self())
                        .DefaultSources(directive => directive.Self())
                        .ImageSources(directive => directive.Self().CustomSources("*"))
                        .FontSources(directive => directive.Self().CustomSources("data:"))
                        .ScriptSources(directive => directive
                            .Self()
                            .UnsafeEval()
                            .UnsafeInline()
                            .CustomSources("https://my.custom.url"))
                        .StyleSources(directive => directive.Self().UnsafeInline().CustomSources("data:"));
                });
            });

            // To configure external authentication please see http://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "HomeSPA",
                    template: "home/{*any}",
                    defaults: new { controller = "Home", action = "Index" });
            });

            //app.UseSwaggerGen();
            //app.UseSwaggerUi();

            using (var context = app.ApplicationServices.GetRequiredService<ApplicationDbContext>())
            {
                context.Database.EnsureCreated();

                // Add Mvc.Client to the known applications.
                if (!context.Applications.Any())
                {
                    // Note: when using the introspection middleware, your resource server
                    // MUST be registered as an OAuth2 client and have valid credentials.
                    // 
                    // context.Applications.Add(new Application {
                    //     Id = "resource_server",
                    //     DisplayName = "Main resource server",
                    //     Secret = "875sqd4s5d748z78z7ds1ff8zz8814ff88ed8ea4z4zzd"
                    // });

                    var hasher = new PasswordHasher<Application>();
                    context.Applications.Add(new Application
                    {
                        Id = "myClient",
                        DisplayName = "My client application",
                        RedirectUri = "http://localhost:53507/signin-oidc",
                        LogoutRedirectUri = "http://localhost:53507/",
                        Secret = hasher.HashPassword(null, "secret_secret_secret"),
                        Type = OpenIddictConstants.ApplicationTypes.Confidential
                    });

                    context.SaveChanges();
                }
            }

        }
    }
}
