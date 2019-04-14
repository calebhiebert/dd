using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using net_api.Controllers;
using net_api.Models;
using dotenv.net;
using Microsoft.AspNetCore.Authorization;
using net_api.Authorization;
using GraphQL;
using net_api.Graphql;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;

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
            DotEnv.Config(throwOnError: false);

            var context = new Context();
            context.Database.Migrate();

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            services.AddCors(opt =>
            {
                opt.AddPolicy("AllowAll", builder => builder
                .WithOrigins("http://localhost:4200", "https://dd.panchem.io", "http://192.168.1.42:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });

            services.AddSignalR();

            services.AddSingleton<IAuthorizationHandler, CampaignEditableHandler>();
            services.AddSingleton<IAuthorizationHandler, CampaignViewableHandler>();
            services.AddSingleton<IAuthorizationHandler, EntityEditableHandler>();
            services.AddSingleton<IAuthorizationHandler, NoteViewableHandler>();
            services.AddSingleton<IAuthorizationHandler, NoteEditableHandler>();
            services.AddSingleton<IAuthorizationHandler, NotificationAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, ConceptEditableHandler>();

            services.AddScoped<IDependencyResolver>(x => new FuncDependencyResolver(x.GetRequiredService));
            services.AddScoped<DDSchema>();
            services.AddGraphQL(x => x.ExposeExceptions = true)
                .AddGraphTypes(ServiceLifetime.Scoped);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("CampaignEditPolicy", policy => policy.Requirements.Add(new CampaignEditorRequirement()));
                options.AddPolicy("CampaignViewPolicy", policy => policy.Requirements.Add(new CampaignViewerRequirement()));
                options.AddPolicy("EntityEditPolicy", policy => policy.Requirements.Add(new EntityEditorRequirement()));
                options.AddPolicy("NoteEditPolicy", policy => policy.Requirements.Add(new NoteEditorRequirement()));
                options.AddPolicy("NoteViewPolicy", policy => policy.Requirements.Add(new NoteViewerRequirement()));
                options.AddPolicy("NotificationEditPolicy", policy => policy.Requirements.Add(new NotificationEditorRequirement()));
                options.AddPolicy("ConceptEditPolicy", policy => policy.Requirements.Add(new ConceptEditorRequirement()));
            });

            services.AddScoped<Context>();
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

            app.UseGraphQL<DDSchema>();
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions());

            app.UseMvc();
        }
    }
}
