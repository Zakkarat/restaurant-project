using AutoMapper;
using Restaurant.BLL.DTOobjects;
using WebApplication.Models;

namespace WebApplication.Profiles
{
    public class DishProfile : Profile
    {
        public DishProfile()
        {
            CreateMap<DishDTO, DishViewModel>();
            CreateMap<DishViewModel, DishDTO>();
        }
    }
}