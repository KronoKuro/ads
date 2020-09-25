using ADS.Domain.ViewModels;
using ADS.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADS.Aplication.AutoMapperProfiles
{
    public class HouseProfile : Profile
    {
        public HouseProfile()
        {
            CreateMap<House, HouseViewModel>()
                .ForMember(x => x.ManagmentCompanyName, opt => opt.MapFrom(x => x.ManagmentCompany.Name))
              .ReverseMap()
                .ForMember(x => x.ManagmentCompany, opt => opt.Ignore()); 
                //.ForMember(x => x.Houses, opt => opt.Ignore());
        }
    }
}
