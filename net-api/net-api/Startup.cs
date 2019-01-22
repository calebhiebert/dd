using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using net_api.Controllers;
using net_api.Models;

namespace net_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var context = new Context();
            context.Database.Migrate();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors(opt =>
            {
                opt.AddPolicy("AllowAll", builder => builder
                .WithOrigins("http://localhost:4200", "https://dd.panchem.io")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });

            services.AddSignalR();

            services.AddScoped<Context>();
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<DDQuery>();
            services.AddSingleton<UserType>();
            services.AddSingleton<CampaignType>();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = "https://panch-dd.auth0.com/";
                options.Audience = "https://dd.panchem.io";

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = ctx =>
                    {
                        var accessToken = ctx.Request.Query["access_token"];

                        var path = ctx.HttpContext.Request.Path;

                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hub"))
                        {
                            ctx.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };
            });

            var sp = services.BuildServiceProvider();
            services.AddSingleton<ISchema>(new DDSchema(new FuncDependencyResolver(type => sp.GetService(type))));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowAll");
            app.UseAuthentication();

            app.UseSignalR(routes =>
            {
                routes.MapHub<UpdateHub>("/hub");
            });

            app.UseMvc();
        }
    }
}
