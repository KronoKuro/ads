using ADS.Domain.ViewModels;
using ADS.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADS.Aplication.AutoMapperProfiles
{
    public class ManagmentCompanyProfile : Profile
    {
        public ManagmentCompanyProfile()
        {
            CreateMap<ManagmentCompany, ManagmentCompanyViewModel>()
                .ForMember(x => x.CityName, opt => opt.MapFrom(x => x.City.Name))
              .ReverseMap()
                .ForMember(x => x.City, opt=> opt.Ignore())
                .ForMember(x => x.Houses, opt => opt.Ignore());
        }
    }
}
