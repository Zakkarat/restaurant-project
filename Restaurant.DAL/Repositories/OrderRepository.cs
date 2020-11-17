using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.Interfaces;
using Restaurant.DAL.Utilities;

namespace Restaurant.DAL.Repositories
{
    public class OrderRepository : IRepository<Order>
    {
        private RestaurantContext _db;
        
        public OrderRepository(RestaurantContext context)
        {
            this._db = context;
        }
        
        public IEnumerable<Order> GetAll()
        {
            return _db.Orders
                .Include(d => d.Dishes)
                .Include(t => t.Table);
        }

        public Order Get(int id)
        {
            return _db.Orders.Find(id);
        }

        public void Create(Order order)
        {
            _db.Orders.Add(order);
        }

        public void Update(Order order)
        {
            _db.Entry(order).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Order order = _db.Orders.Find(id);
            if (order != null)
                _db.Orders.Remove(order);
        }

        /*public IEnumerable<Order> Find(Func<Order, bool> predicate)
        {
            return _db.Orders
                .Include(o => o.Dishes)
                .Include(o=>o.Table)
                .Where(predicate)
                .ToList();
        }*/
        
    }
}