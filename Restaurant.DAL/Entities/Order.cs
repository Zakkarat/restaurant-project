using System.Collections.Generic;
using Restaurant.DAL.Entities;

namespace Restaurant.DAL
{
    public class Order
    {
        public int Id { get; set; }
        public int Amount { get; set; }

        public int TableId { get; set; }
        public Table Table { get; set; }
        
        public List<Dish> Dishes { get; set; }
    }
}
