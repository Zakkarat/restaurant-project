using System.Collections.Generic;

namespace Restaurant.DAL.Entities
{
    public class Table
    {
        public int Id { get; set; }
        public int Number { get; set; }
        
        public List<Order> Orders { get; set; }
    }
}