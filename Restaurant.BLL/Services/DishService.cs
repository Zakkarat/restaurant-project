using AutoMapper;
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
    }
}