using System.Collections.Generic;
using Restaurant.DAL.Entities;

namespace Restaurant.BLL.DTOobjects
{
    public class IngredientDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Dishes { get; set; }
    }
}