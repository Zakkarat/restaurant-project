using System.Collections.Generic;
using ASP.NETCoreWebApplication.Models;
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
    }
}