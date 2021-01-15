using ADS.Aplication.StartUpConfigs;
using ADS.Domain.Profiles;
using ADS.Infrastructure;
using ADS.Infrastructure.Abstract;
using AspNet.Security.OAuth.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ADS.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ADS.Infrastructure.Settings;

namespace ADS.Aplication
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
            services.AddControllersWithViews();
            string connection = Configuration.GetConnectionString("DefaultConnection");
            // добавляем контекст MobileContext в качестве сервиса в приложение
            services.AddDbContext<ADCContext>(options =>
                options.UseSqlServer(connection));
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            //
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {
                opt.RequireHttpsMetadata = false;
                opt.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidIssuer = TokenSettings.ISSUER,
                    ValidateAudience = true,
                    ValidAudience = TokenSettings.AUDIENCE,
                    ValidateLifetime = true,
                    IssuerSigningKey = TokenSettings.GetSymmetricSecurityKey(),
                    ValidateIssuerSigningKey = true
                };
            });

            services.AddAuthorization();

            //
           

            services.AddIdentity<User, Role>(options =>
            {
                options.User.RequireUniqueEmail = false;
            })
            .AddEntityFrameworkStores<ADCContext>()
            .AddDefaultTokenProviders();

            //services.AddOpenIddict(options =>
            //{
            //    options.AddEntityFrameworkCoreStores<ADCContext>();
            //    options.AddMvcBinders();
            //    options.EnableTokenEndpoint("/authorize/token");
            //    options.AllowPasswordFlow();
            //    options.AllowRefreshTokenFlow();
            //    options.DisableHttpsRequirement();
            //    options.UseRollingTokens();
            //    // options.UseJsonWebTokens(); //Use JWT if preferred
            //    options.AddSigningKey(new SymmetricSecurityKey(Encoding.ASCII.GetBytes("Alcatraz")));
            //});


            services.AddControllers()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );


                        //options.AddMvcBinders();
                        //options.EnableTokenEndpoint("/connect/token");
                        //options.AllowPasswordFlow();
                        //options.AllowRefreshTokenFlow();
                        //options.DisableHttpsRequirement();
                        //options.UseRollingTokens();
                        //// options.UseJsonWebTokens(); //Use JWT if preferred
                        //options.AddSigningKey(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appSettings["STSKey"])));



                        //var mappingConfig = new MapperConfiguration(mc =>
                        //{
                        //    mc.AddProfile(new MappingProfile());
                        //});

                        //IMapper mapper = mappingConfig.CreateMapper();
                        //services.AddSingleton(mapper);
                        services.ConfigurationAutoMapper();

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseAuthentication();

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                spa.Options.StartupTimeout = TimeSpan.FromMinutes(2);

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    //spa.Options.StartupTimeout = TimeSpan.FromMinutes(3);
                }
            });
            
        }
    }
}
