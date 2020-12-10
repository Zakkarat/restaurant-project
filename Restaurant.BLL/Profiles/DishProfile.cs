using System;
using System.Linq;
using AutoMapper;
using Restaurant.BLL.DTOobjects;
using Restaurant.DAL.Entities;

namespace Restaurant.BLL.Profiles
{
    public class DishProfile : Profile
    {
        public DishProfile()
        {
            CreateMap<Dish, DishDTO>()
                .ForMember(dto=>dto.Ingredients,
                    opt
                        => opt.MapFrom(e=>e.Ingredients
                            .Select(s=>s.Name)))
                .ForMember(dto=>dto.Orders,
                    opt
                        => opt.MapFrom(o=>o.Orders
                            .Select(e=>e.Id)));
            
            CreateMap<DishDTO, Dish>();
        }
    }
}