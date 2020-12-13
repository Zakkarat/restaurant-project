using System;
using System.Collections.Generic;
using Restaurant.BLL.DTOobjects;

namespace Restaurant.BLL.Interfaces
{
    public interface IDishService : IDisposable
    {
        public IEnumerable<DishDTO> GetAll();
        public DishDTO Get(int id);
        public void AddIngredient(int dishId, string ingredient);
        public void DeleteIngredient(int dishId, string ingredient);
        public void EditDish(int dishId, string name, int cookingTime, int price);
        public void AddDish(string name, int cookingTime, int price);
        public void Delete(int dishId);
    }
}