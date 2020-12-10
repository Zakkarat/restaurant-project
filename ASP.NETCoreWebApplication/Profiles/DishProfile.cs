using System.Linq;
using ASP.NETCoreWebApplication.Models;
using AutoMapper;
using Restaurant.BLL.DTOobjects;

namespace ASP.NETCoreWebApplication.Profiles
{
    public class DishProfile : Profile
    {
        public DishProfile()
        {
            CreateMap<DishDTO, DishViewModel>()
                .ForMember(dto=>dto.Ingredients,
                    opt
                        => opt.MapFrom(e=>e.Ingredients));
            CreateMap<DishViewModel, DishDTO>();
        }
    }
}