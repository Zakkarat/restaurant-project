using System;
using System.Collections.Generic;
using Restaurant.DAL.Entities;

namespace Restaurant.BLL.DTOobjects
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int Discount { get; set; }
        
        public int Table { get; set; }
        public IEnumerable<Tuple<string, int, int, int>> Dishes { get; set; }
    }
}