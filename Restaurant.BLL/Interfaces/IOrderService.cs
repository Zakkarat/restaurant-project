using System;
using System.Collections.Generic;
using Restaurant.BLL.DTOobjects;

namespace Restaurant.BLL.Interfaces
{
    public interface IOrderService : IDisposable
    {
        public IEnumerable<OrderDTO> GetAll();
    }
}