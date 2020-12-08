using System.Collections.Generic;
using AutoMapper;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;
using Restaurant.DAL.Interfaces;

namespace Restaurant.BLL.Services
{
    public class IngredientService : IIngredientService
    {
        private IUnitOfWork _db;
        private Mapper _mapper;
        
        public void Dispose()
        {
            _db.Dispose();
        }
        
        public IngredientService(IUnitOfWork db)
        {
            _db = db;
            
            _mapper = new Mapper(
                new MapperConfiguration(
                    cfg=>cfg
                        .AddProfile<IngredientProfile>()));
        }

        public IEnumerable<IngredientDTO> GetAll()
        {
            var ingredients = _mapper
                .Map<IEnumerable<IngredientDTO>>(
                    _db.Ingredients.GetAll());
            
            return ingredients;
        }
    }
}