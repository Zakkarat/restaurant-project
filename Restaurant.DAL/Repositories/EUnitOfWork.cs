using System;
using Restaurant.DAL.Entities;
using Restaurant.DAL.Interfaces;
using Restaurant.DAL.Utilities;

namespace Restaurant.DAL.Repositories
{
    public class EUnitOfWork : IUnitOfWork, IDisposable
    {
        private RestaurantContext _db;
        
        private DishRepository _dishRepository;
        private IngredientRepository _ingredientRepository; 
        private OrderRepository _orderRepository;
        private TableRepository _tableRepository;

        public EUnitOfWork(string connection)
            => _db = new RestaurantContext(connection);
        
        public IRepository<Dish> Dishes
        {
            get
            {
                if (_dishRepository == null)
                    _dishRepository = new DishRepository(_db);
                return _dishRepository;
            }
        }

        public IRepository<Ingredient> Ingredients
        {
            get
            {
                if(_ingredientRepository == null)
                    _ingredientRepository = new IngredientRepository(_db);
                return _ingredientRepository;
            }
        }

        public IRepository<Order> Orders
        {
            get
            {
                if (_orderRepository == null)
                    _orderRepository = new OrderRepository(_db);
                return _orderRepository;
            }
        }

        public IRepository<Table> Tables
        {
            get
            {
                if (_tableRepository == null)
                    _tableRepository = new TableRepository(_db);
                return _tableRepository;
            }
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        private bool _disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
                }
            }
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}