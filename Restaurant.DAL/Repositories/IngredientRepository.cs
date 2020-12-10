using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.Entities;
using Restaurant.DAL.Interfaces;
using Restaurant.DAL.Utilities;

namespace Restaurant.DAL.Repositories
{
    public class IngredientRepository : IRepository<Ingredient>
    {
        private RestaurantContext _db;
        
        public IngredientRepository(RestaurantContext context)
        {
            this._db = context;
        }

        public IEnumerable<Ingredient> GetAll()
        {
            return _db.Ingredients
             .Include(d => d.Dishes);
        }

        public Ingredient Get(int id)
        {
            return _db.Ingredients.Find(id);
        }

        public void Create(Ingredient ingredient)
        {
            _db.Ingredients.Add(ingredient);
        }

        public void Update(Ingredient ingredient)
        {
            _db.Entry(ingredient).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Ingredient ingredient = _db.Ingredients.Find(id);
            if (ingredient != null)
                _db.Ingredients.Remove(ingredient);
        }

        /*public IEnumerable<Ingredient> Find(Func<Ingredient, bool> predicate)
        {
            return _db.Ingredients
                .Include(o => o.Dishes)
                .Where(predicate)
                .ToList();
        }*/
    }
}