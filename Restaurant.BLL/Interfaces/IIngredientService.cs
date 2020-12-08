using System;
using System.Collections.Generic;
using Restaurant.BLL.DTOobjects;

namespace Restaurant.BLL.Interfaces
{
    public interface IIngredientService : IDisposable
    {
        public IEnumerable<IngredientDTO> GetAll();
    }
}