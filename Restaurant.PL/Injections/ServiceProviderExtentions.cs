using Microsoft.Extensions.DependencyInjection;
using Restaurant.BLL.Injections;
using Restaurant.BLL.Interfaces;
using Restaurant.BLL.Services;

namespace Restaurant.PL.Injections
{
    public static class ServiceProviderExtentions
    {
        public static void AddIngredientService(this IServiceCollection services, string connection)
            => services.AddTransient<IIngredientService, IIngredientService>(obj
                => ServiceModule.Init<IngredientService>(connection));
    }
}