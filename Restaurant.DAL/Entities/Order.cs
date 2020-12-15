using System.Collections.Generic;
using Restaurant.DAL.Entities;

namespace Restaurant.DAL
{
    public class Order
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public int Discount { get; set; }
        public Table Table { get; set; }
        public List<Dish> Dishes { get; set; }
        public List<DishOrder> DishOrders { get; set; }

    }
}
