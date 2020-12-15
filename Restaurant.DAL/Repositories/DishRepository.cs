using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.Entities;
using Restaurant.DAL.Interfaces;
using Restaurant.DAL.Utilities;

namespace Restaurant.DAL.Repositories
{
    public class DishRepository : IRepository<Dish>
    {
        private RestaurantContext _db;

        public DishRepository(RestaurantContext context)
        {
            this._db = context;
        }

        public IEnumerable<Dish> GetAll()
        {
            return _db.Dishes
                .Include(i => i.Ingredients)
                .Include(o => o.Orders);
        }
        
        public Dish Get(int id)
        {
            return _db.Dishes
                .Include(i=>i.Ingredients)
                .Include(o=>o.Orders)
                .Select(elem=>elem).Single(elem => elem.Id == id);
        }

        public void Create(Dish dish)
        {
            _db.Dishes.Add(dish);
        }

        public void Update(Dish dish)
        {
            _db.Entry(dish).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Dish dish = _db.Dishes.Find(id);
            if (dish != null)
                _db.Dishes.Remove(dish);
        }
    }
}