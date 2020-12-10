using Microsoft.Extensions.DependencyInjection;
using Restaurant.BLL.Injections;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Services;

namespace ASP.NETCoreWebApplication.Injections
{
    public static class ServiceProviderExtentions
    {
        public static void AddIngredientService(this IServiceCollection services, string connection)
            => services.AddTransient<IIngredientService, IIngredientService>(obj
                => ServiceModule.Init<IngredientService>(connection));
        
        public static void AddDishService(this IServiceCollection services, string connection)
            => services.AddTransient<IDishService, IDishService>(obj
                => ServiceModule.Init<DishService>(connection));
    }
}