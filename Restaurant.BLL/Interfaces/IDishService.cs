using System;
using System.Collections.Generic;
using Restaurant.BLL.DTOobjects;

namespace Restaurant.BLL.Interfaces
{
    public interface IDishService : IDisposable
    {
        public IEnumerable<DishDTO> GetAll();
        public DishDTO Get(int id);
    }
}