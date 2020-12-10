using System.Linq;
using AutoMapper;
using Restaurant.BLL.DTOobjects;
using Restaurant.DAL.Entities;

namespace Restaurant.BLL.Profiles
{
    public class IngredientProfile : Profile
    {
        public IngredientProfile()
        {
            CreateMap<Ingredient, IngredientDTO>()
                .ForMember(dto=>dto.Dishes,
                    opt
                        => opt.MapFrom(e=>e.Dishes
                            .Select(s=>s.Name)));
            
            CreateMap<IngredientDTO, Ingredient>();
        }
    }
}