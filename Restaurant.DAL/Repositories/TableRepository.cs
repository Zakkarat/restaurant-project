using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.Entities;
using Restaurant.DAL.Interfaces;
using Restaurant.DAL.Utilities;

namespace Restaurant.DAL.Repositories
{
    public class TableRepository : IRepository<Table>
    {
        private RestaurantContext _db;
        
        public TableRepository(RestaurantContext context)
        {
            this._db = context;
        }
        
        public IEnumerable<Table> GetAll()
        {
            return _db.Tables
                .Include(o => o.Orders);
        }

        public Table Get(int id)
        {
            return _db.Tables.Find(id);
        }

        public void Create(Table table)
        {
            _db.Tables.Add(table);
        }

        public void Update(Table table)
        {
            _db.Entry(table).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Table table = _db.Tables.Find(id);
            if (table != null)
                _db.Tables.Remove(table);
        }

        /*public IEnumerable<Table> Find(Func<Table, bool> predicate)
        {
            return _db.Tables
                .Include(o => o.Orders)
                .Where(predicate)
                .ToList();
        }*/
    }
}