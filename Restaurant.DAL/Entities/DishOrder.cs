namespace Restaurant.DAL.Entities
{
    public class DishOrder
    {
        public int DishesId { get; set; }
        public Dish Dish { get; set; }
        
        public int OrdersId { get; set; }
        public Order Order { get; set; }
        
        public int Amount { get; set; }
    }
}