using System.Collections.Generic;
using Restaurant.DAL;
using Restaurant.DAL.Entities;

namespace Restaurant.BLL.DTOobjects
{
    public class DishDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int CookingTime { get; set; }
        
        public List<Order> Orders { get; set; }
        public List<Ingredient> Ingredients { get; set; }
    }
}