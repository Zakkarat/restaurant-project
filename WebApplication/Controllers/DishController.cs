using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;
using Restaurant.BLL.Services;
using Restaurant.DAL.Entities;

namespace WebApplication.Controllers
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
        public IEnumerable<Dish> Get()
        {
            return (_mapper.Map<IEnumerable<Dish>>(_service.GetAll()));
        }
    }
}