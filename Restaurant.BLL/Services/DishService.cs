using System.Collections.Generic;
using AutoMapper;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;
using Restaurant.DAL.Interfaces;

namespace Restaurant.BLL.Services
{
    public class DishService : IDishService
    {
        private IUnitOfWork _db;
        private Mapper _mapper;
        
        public void Dispose()
        {
            _db.Dispose();
        }
        
        public DishService(IUnitOfWork db)
        {
            _db = db;
            
            _mapper = new Mapper(
                new MapperConfiguration(
                    cfg=>cfg
                        .AddProfile<DishProfile>()));
        }
        
        public IEnumerable<DishDTO> GetAll()
        {
            var dishes = _mapper
                .Map<IEnumerable<DishDTO>>(
                    _db.Dishes.GetAll());
            
            return dishes;
        }
    }
}