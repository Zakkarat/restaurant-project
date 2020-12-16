using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Restaurant.BLL.DTOobjects;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Profiles;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private IOrderService _service;
        private Mapper _mapper;

        private readonly ILogger<OrderController> _logger;

        public OrderController(ILogger<OrderController> logger, IOrderService service)
        {
            _logger = logger;
            _service = service;
            _mapper = new Mapper(
                new MapperConfiguration(cfg
                    => cfg.AddProfile<OrderProfile>()));
        }
        [HttpGet]
        public IEnumerable<OrderDTO> GetAll()
        {
            return (_mapper.Map<IEnumerable<OrderDTO>>(_service.GetAll()));
        }
        
        [HttpGet("{id}")]
        public OrderDTO Get(int id)
        {
            return (_mapper.Map<OrderDTO>(_service.Get(id)));
        }
        
        [HttpPut("addOrder")]
        public void AddOrder(int tableId)
        {
            _service.AddOrder(tableId);
        }
        
        [HttpDelete("deleteOrder")]
        public void DeleteOrder(int orderId)
        {
            _service.DeleteOrder(orderId);
        }
        
        [HttpPut("addDish")]
        public void AddDish(int orderId, string dish)
        {
            _service.AddDish(orderId, dish);
        }
        
        [HttpDelete("deleteDish")]
        public void DeleteDish(int orderId, string dish)
        {
            _service.DeleteDish(orderId, dish);
        }
        
        [HttpPost("editOrder")]
        public void EditOrder(int orderId, int tableId, int discount)
        {
            _service.EditOrder(orderId, tableId, discount);
        }
    }
    
}