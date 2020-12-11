using System;
using System.Collections.Generic;
using Restaurant.BLL.DTOobjects;

namespace Restaurant.BLL.Interfaces
{
    public interface IIngredientService : IDisposable
    {
        public IEnumerable<IngredientDTO> GetAll();
        public void Add(string ingredient);
        public void Update(int oldIngredient, string newIngredient);
        public void Delete(string ingredient);
    }
}