using System;
using Microsoft.Extensions.Configuration;
using Restaurant.DAL.Utilities;
using Restaurant.PL.Controllers;

namespace Restaurant.PL
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            // RestaurantContext restCont = new RestaurantContext();
            //Initialize.Init(restCont);
            
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json",optional:false).Build();
           
            
            Start start = new Start(config);
            
            start.ConfigureServices();
            
        }
    }
}