using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;
using Restaurant.DAL.Entities;

namespace WebApplication.Controllers
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
        public IEnumerable<Ingredient> Get()
        {
            return (_mapper.Map<IEnumerable<Ingredient>>(_service.GetAll()));
        }
    }
}