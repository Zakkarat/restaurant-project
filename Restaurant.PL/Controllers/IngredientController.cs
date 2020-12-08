using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;
using Restaurant.DAL.Entities;

namespace Restaurant.PL.Controllers
{
    public class IngredientController : Controller
    {
        private IIngredientService _service;
        private Mapper _mapper;

        public IngredientController(IIngredientService service)
        {
            _service = service;
            _mapper = new Mapper(
                new MapperConfiguration(cfg
                => cfg.AddProfile<IngredientProfile>()));
        }

        public void kakHochesh()
        {
            var peremennaya = _mapper.Map<IEnumerable<IngredientDTO>>(_service.GetAll());
            Console.WriteLine(peremennaya);
        }
    }
}