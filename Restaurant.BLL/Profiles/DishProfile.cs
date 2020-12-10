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
            
            CreateMap<IngredientDTO, Ingredient>();
            CreateMap<Ingredient, IngredientDTO>();

            CreateMap<Dish, DishDTO>()
                .ForMember(dto => dto.Ingredients,
                    opt =>
                        opt.MapFrom(elem => elem.Ingredients.Select(e => e)));
            CreateMap<Ingredient, DishDTO>();
            // CreateMap<Ingredient, DishDTO>()
            //     .ForMember(dto => dto.Ingredients,
            //         opt => 
            //             opt.MapFrom(s => s));
            // CreateMap<DishDTO, Dish>();
            // .ForMember(dto=>dto.Ingredients,
            //     opt
            //         => opt.MapFrom(s=>s.Ingredients
            //             .Select(elem => elem.Name).ToList()));

            // CreateMap<Dish, DishDTO>()
            //     .ForMember(dto=>dto.Ingredients, 
            //         opt=>
            //             opt.Ignore());

            // CreateMap<Ingredient, IngredientDTO>();
        }
    }
}