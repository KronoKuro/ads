using ADS.Domain.ViewModels;
using ADS.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADS.Aplication.AutoMapperProfiles
{
    public class ApartmentProfile : Profile
    {
        public ApartmentProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<Apartment, ApartmentViewModel>()
            .ReverseMap()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id))
                .ForMember(x => x.House, opt => opt.Ignore());
            //CreateMap<UserDto, User>();
        }
    }
}
