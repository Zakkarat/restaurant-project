using System;
using Restaurant.DAL.Entities;

namespace Restaurant.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Dish> Dishes { get; }
        IRepository<Ingredient> Ingredients { get; }
        IRepository<Order> Orders { get; }
        IRepository<Table> Tables { get; }
        void Save();
    }
}