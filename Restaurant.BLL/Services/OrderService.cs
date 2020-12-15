using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;
using Restaurant.DAL;
using Restaurant.DAL.Entities;
using Restaurant.DAL.Interfaces;
using Restaurant.DAL.Utilities;
using Unity.Injection;

namespace Restaurant.BLL.Services
{
    public class OrderService : IOrderService
    {
        private IUnitOfWork _db;
        private Mapper _mapper;
        
        public void Dispose()
        {
            _db.Dispose();
        }
        
        public OrderService(IUnitOfWork db)
        {
            _db = db;
            _mapper = new Mapper(
                new MapperConfiguration(
                    cfg=>cfg
                        .AddProfile<OrderProfile>()));
        }
        
        public IEnumerable<OrderDTO> GetAll()
        {
            var orders = _mapper
                .Map<IEnumerable<OrderDTO>>(
                    _db.Orders.GetAll());
            return orders;
        }
        
        public OrderDTO Get(int id)
        {
            return _mapper.Map<OrderDTO>
                (_db.Orders.Get(id));
        }
        
        public void AddOrder(int tableId)
        {
            Order order = new Order();

            if (tableId > 0 && tableId <= 25)
            {
                order.TableId = tableId;
                _db.Orders.Create(order);
                _db.Save();
            }
            else
            {
                throw new Exception("Sorry, this operation can't be done. Try again!");
            }
        }
        
        public void DeleteOrder(int orderId)
        {
            if (_db.Orders.GetAll().Any(elem => elem.Id == orderId))
            {
                _db.Orders.Delete(orderId);
                _db.Save();
            }
        }

        public void EditOrder(int orderId, int tableId, int discount)
        {
            Order order = _db.Orders.Get(orderId);

            if (tableId < 1 || tableId > 25)
            {
                throw new Exception("Sorry, this operation can't be done. Try again!");
            }

            order.Table = _db.Tables.Get(tableId);
            order.Discount = discount;
            
            _db.Orders.Update(order);
            _db.Save();
        }

        public void AddDish(int orderId, string newDish)
        {
            Order order = _db.Orders.Get(orderId);
            Dish dish = _db.Dishes.GetAll()
                .Single(elem => elem.Name == newDish);
            
            if (_db.Dishes.GetAll().Any(elem => elem.Name == newDish))
            {
                if (order.Dishes.Any(elem => elem.Name == newDish))
                {
                    List<DishOrder> dishOrders = order.DishOrders;
                    DishOrder neededDishOrder = dishOrders.
                        Single(od => od.Dish
                            .Equals(dish) && od.Order.Equals(order));
                    dishOrders.Remove(neededDishOrder);
                    neededDishOrder.Amount += 1;
                    dishOrders.Add(neededDishOrder);
                    order.DishOrders = dishOrders;
                    
                    _db.Orders.Update(_mapper.Map<Order>(order));    
                    _db.Save();
                    return;
                }

                order.Dishes.Add(dish);
                
                _db.Orders.Update(_mapper.Map<Order>(order));
                _db.Save();
            }
            else
            {
                throw new Exception("Sorry, this operation can't be done. Try again!");
            }
        }
        
        public void DeleteDish(int orderId, string deleteDish)
        {
            Order order = _db.Orders.Get(orderId);
            Dish dish = _db.Dishes.GetAll()
                .Single(elem => elem.Name == deleteDish);
            
            if (_db.Dishes.GetAll().Any(elem => elem.Name == deleteDish))
            {
                if (order.Dishes.Any(elem => elem.Name == deleteDish)
                && order.DishOrders.Any(od => od.Dish
                    .Equals(dish) && od.Order.Equals(order) && od.Amount > 1))
                {
                    List<DishOrder> dishOrders = order.DishOrders;
                    DishOrder neededDishOrder = dishOrders.
                        Single(od => od.Dish
                            .Equals(dish) && od.Order.Equals(order));
                    dishOrders.Remove(neededDishOrder);
                    neededDishOrder.Amount -= 1;
                    dishOrders.Add(neededDishOrder);
                    order.DishOrders = dishOrders;
                    
                    _db.Orders.Update(_mapper.Map<Order>(order));    
                    _db.Save();
                    return;
                }

                order.Dishes.Remove(dish);
                
                _db.Orders.Update(_mapper.Map<Order>(order));
                _db.Save();
            }
            else
            {
                throw new Exception("Sorry, this operation can't be done. Try again!");
            }
        }
    }
}