using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;
using Restaurant.DAL.Entities;
using Restaurant.DAL.Interfaces;

namespace Restaurant.BLL.Services
{
    public class DishService : IDishService
    {
        private IUnitOfWork _db;
        private Mapper _mapper;
        
        public void Dispose()
        {
            _db.Dispose();
        }
        
        public DishService(IUnitOfWork db)
        {
            _db = db;
            
            _mapper = new Mapper(
                new MapperConfiguration(
                    cfg=>cfg
                        .AddProfile<DishProfile>()));
        }
        
        public IEnumerable<DishDTO> GetAll()
        {
            var dishes = _mapper
                .Map<IEnumerable<DishDTO>>(
                    _db.Dishes.GetAll());
            
            return dishes;
        }
        
        public DishDTO Get(int id)
        {
            return _mapper.Map<DishDTO>
                (_db.Dishes.Get(id));
        }
        
        public void AddIngredient(int dishId, string ingredient)
        {
            Ingredient ingred = new Ingredient();
            Dish dish = _db.Dishes.Get(dishId);
            
            if (!(dish.Ingredients.Any(elem => elem.Name == ingredient)))
            {
                
                try
                {
                    Ingredient newIngred = _db.Ingredients.GetAll()
                        .Single(elem => elem.Name == ingredient);
                    dish.Ingredients.Add(newIngred);
                }
                catch
                {
                    ingred.Name = ingredient;
                    dish.Ingredients.Add(ingred);
                }
                _db.Dishes.Update(dish);
                _db.Save();
            }
            else
            {
                throw new Exception("Sorry, this operation can't be done. Try again!");
            }
        }
        
        public void DeleteIngredient(int dishId, string ingredient)
        {
            Ingredient ingred = _db.Ingredients.GetAll().Single(elem => elem.Name == ingredient);
            Dish dish = _db.Dishes.Get(dishId);
            
            if (dish.Ingredients.Any(elem => elem.Name == ingredient))
            {
                dish.Ingredients.Remove(ingred);
                _db.Dishes.Update(dish);
                _db.Save();
            }
            else
            {
                throw new Exception("Sorry, this operation can't be done. Try again!");
            }
        }
        
        public void EditDish(int dishId, string name, int cookingTime, int price)
        {
            Dish dish = _db.Dishes.Get(dishId);
            if (name != "" && cookingTime > 0 && price > 0)
            {
                dish.Name = name;
                dish.CookingTime = cookingTime;
                dish.Price = price;
                _db.Dishes.Update(dish);
                _db.Save();
            }
            else
            {
                throw new Exception("Sorry, this operation can't be done. Try again!");
            }
        }
        
        public void AddDish(string name, int cookingTime, int price)
        {
            Dish dish = new Dish();
            if (name != "" && cookingTime > 0 && price > 0)
            {
                dish.Name = name;
                dish.CookingTime = cookingTime;
                dish.Price = price;
                _db.Dishes.Create(dish);
                _db.Save();
            }
            else
            {
                throw new Exception("Sorry, this operation can't be done. Try again!");
            }
        }
        
        public void Delete(int dishId)
        {
            Dish dish = _db.Dishes.GetAll()
                .Single(elem => elem.Id == dishId);

            if (!dish.Equals(null))
            {
                _db.Dishes.Delete(dish.Id);
                _db.Save();
            }
        }
    }
}