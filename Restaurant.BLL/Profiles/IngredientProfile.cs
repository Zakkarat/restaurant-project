using AutoMapper;
using Restaurant.BLL.DTOobjects;
using Restaurant.DAL.Entities;

namespace Restaurant.BLL.Profiles
{
    public class IngredientProfile : Profile
    {
        public IngredientProfile()
        {
            CreateMap<IngredientDTO, Ingredient>();
            CreateMap<Ingredient, IngredientDTO>();
        }
    }
}