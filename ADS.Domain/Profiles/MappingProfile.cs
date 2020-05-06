using ADS.Domain.ViewModels;
using ADS.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ADS.Domain.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<City, CityViewModel>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name))
            .ReverseMap()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name));
            //CreateMap<UserDto, User>();
        }
    }
}
