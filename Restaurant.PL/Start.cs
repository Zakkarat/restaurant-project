using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Restaurant.PL.Injections;

namespace Restaurant.PL
{
    public class Start
    {
        public Start(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("LocalDb");
            
            services.AddIngredientService(connectionString);
            
            
        }

    }
}