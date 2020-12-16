using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DishController : ControllerBase
    {
        private IDishService _service;
        private Mapper _mapper;

        private readonly ILogger<DishController> _logger;

        public DishController(ILogger<DishController> logger, IDishService service)
        {
            _logger = logger;
            _service = service;
            _mapper = new Mapper(
                new MapperConfiguration(cfg
                    => cfg.AddProfile<DishProfile>()));
        }
        
        [HttpGet]
        public IEnumerable<DishDTO> GetAll()
        {
            return (_mapper.Map<IEnumerable<DishDTO>>(_service.GetAll()));
        }
        
        [HttpGet("{id}")]
        public DishDTO Get(int id)
        {
            return (_mapper.Map<DishDTO>(_service.Get(id)));
        }

        [HttpPut("addIngredient")]
        public void AddIngredient(int dishId, string ingredient)
        {
            _service.AddIngredient(dishId, ingredient);
        }
        
        [HttpDelete("deleteIngredient")]
        public void DeleteIngredient(int dishId, string ingredient)
        {
            _service.DeleteIngredient(dishId, ingredient);
        }
        
        [HttpDelete("deleteDish")]
        public void Delete(int dishId)
        {
            _service.Delete(dishId);
        }
        
        [HttpPut("addDish")]
        public void AddIDish(string name, int cookingTime, int price)
        {
            _service.AddDish(name, cookingTime, price);
        }

        [HttpPost("editDish")]
        public void EditDish(int dishId, string name, int cookingTime, int price)
        {
            _service.EditDish(dishId, name, cookingTime, price);
        }
    }
}