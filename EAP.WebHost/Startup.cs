using CryptoHelper;
using EAP.WebHost.Models;
using EAP.WebHost.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NWebsec.Middleware;
using OpenIddict;
using OpenIddict.Models;
using System;
using System.Linq;

namespace EAP.WebHost
{
    public class Startup
    {
        public static void Main(string[] args)
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


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("config.json")
                .AddEnvironmentVariables()
                .Build();

            services.AddMvc();
            services.AddMvcDnx();

            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(configuration["Data:DefaultConnection:ConnectionString"]));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddOpenIddict();

            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            var factory = app.ApplicationServices.GetRequiredService<ILoggerFactory>();
            factory.AddConsole();
            factory.AddDebug();

            app.UseIISPlatformHandler();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseDeveloperExceptionPage();

            app.UseStaticFiles();

            // Add a middleware used to validate access
            // tokens and protect the API endpoints.
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

            app.UseMvcWithDefaultRoute();

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
                        Secret = Crypto.HashPassword("secret_secret_secret"),
                        Type = OpenIddictConstants.ApplicationTypes.Confidential
                    });

                    // To test this sample with Postman, use the following settings:
                    // 
                    // * Authorization URL: http://localhost:54540/connect/authorize
                    // * Access token URL: http://localhost:54540/connect/token
                    // * Client ID: postman
                    // * Client secret: [blank] (not used with public clients)
                    // * Scope: openid email profile roles
                    // * Grant type: authorization code
                    // * Request access token locally: yes
                    context.Applications.Add(new Application
                    {
                        Id = "postman",
                        DisplayName = "Postman",
                        RedirectUri = "https://www.getpostman.com/oauth2/callback",
                        Type = OpenIddictConstants.ApplicationTypes.Public
                    });
                    context.SaveChanges();
                }
            }

        }
    }
}
