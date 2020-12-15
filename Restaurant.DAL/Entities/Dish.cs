using System;
using System.Collections.Generic;

namespace Restaurant.DAL.Entities
{
    public class Dish
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int CookingTime { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Order> Orders { get; set; }
        
        public List<DishOrder> DishOrders { get; set; }
    }
}