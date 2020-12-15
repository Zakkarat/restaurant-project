using System;
using System.Linq;
using AutoMapper;
using Restaurant.BLL.DTOobjects;
using Restaurant.DAL;
using Restaurant.DAL.Entities;

namespace Restaurant.BLL.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {

            CreateMap<OrderDTO, Order>();
            CreateMap<Order, OrderDTO>()
                .ForMember(d => d.Table,
                    opt
                        => opt.MapFrom(t => t.Table.Id))
                .ForMember(d => d.Dishes,
                    opt =>
                        opt.MapFrom(order => order.Dishes
                            .Select(dish => new Tuple<string, int, int, int>
                                (dish.Name, dish.CookingTime, dish.Price, dish.DishOrders
                                    .Single(od => od.Dish.Equals(dish) 
                                                  && od.Order.Equals(order)).Amount)
                        )));
        }
    }
}