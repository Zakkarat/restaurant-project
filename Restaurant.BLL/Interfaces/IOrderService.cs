using System;
using System.Collections.Generic;
using Restaurant.BLL.DTOobjects;

namespace Restaurant.BLL.Interfaces
{
    public interface IOrderService : IDisposable
    {
        public IEnumerable<OrderDTO> GetAll();
        public OrderDTO Get(int id);
        public void AddOrder(int tableId);
        public void DeleteOrder(int orderId);
        public void EditOrder(int orderId, int tableId, int discount);
        public void AddDish(int orderId, string newDish);
        public void DeleteDish(int orderId, string deleteDish);

    }
}