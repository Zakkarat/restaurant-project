using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.Entities;

namespace Restaurant.DAL.Utilities
{
    public class RestaurantContext : DbContext
    {
        private string _connection;
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Table> Tables { get; set; }

        public RestaurantContext(string connection)
        {
            _connection = connection;
            
            // Database.EnsureDeleted();
            
            if(Database.EnsureCreated())
                Initialize.Init(this);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connection);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasOne(p => p.Table)
                .WithMany(t => t.Orders)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Dish>()
                .HasMany(p => p.Ingredients)
                .WithMany(p => p.Dishes);

            modelBuilder.Entity<Dish>()
                .HasMany(p => p.Orders)
                .WithMany(t => t.Dishes);
        }
    }
}