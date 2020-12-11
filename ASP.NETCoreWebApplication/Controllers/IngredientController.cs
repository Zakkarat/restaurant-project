using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;
using Restaurant.DAL.Entities;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IngredientController : ControllerBase
    {
        private IIngredientService _service;
        private Mapper _mapper;

        private readonly ILogger<IngredientController> _logger;

        public IngredientController(ILogger<IngredientController> logger, IIngredientService service)
        {
            _logger = logger;
            _service = service;
            _mapper = new Mapper(
                new MapperConfiguration(cfg
                    => cfg.AddProfile<IngredientProfile>()));
        }
        [HttpGet]
        public IEnumerable<IngredientDTO> Get()
        {
            return (_mapper.Map<IEnumerable<IngredientDTO>>(_service.GetAll()));
        }
        [HttpPost]
        public void Add(string ingredient)
        {
            _service.Add(ingredient);
        }
        [HttpPost("delete")]
        public void Delete(string ingredient)
        {
            _service.Delete(ingredient);
        }
    }
}