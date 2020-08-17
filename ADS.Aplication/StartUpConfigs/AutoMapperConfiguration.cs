using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADS.Aplication.StartUpConfigs
{
    public static class AutoMapperConfiguration
    {
        public static IServiceCollection ConfigurationAutoMapper(this IServiceCollection services)
        {
            var configuration = new MapperConfiguration(cf =>
            {
                cf.AddMaps(typeof(AutoMapperConfiguration).Assembly);
            });

            var mapper = configuration.CreateMapper();
            services.AddSingleton(mapper);

            return services;
        }
    }
}
