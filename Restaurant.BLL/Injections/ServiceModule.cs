using Restaurant.DAL.Interfaces;
using Restaurant.DAL.Repositories;
using Unity;
using Unity.Resolution;

namespace Restaurant.BLL.Injections
{
    public class ServiceModule
    {
        public static IUnityContainer _container;

        public static IUnityContainer Container
        {
            get
            {
                if (_container == null)
                {
                    _container = new UnityContainer();
                    _container.RegisterType<IUnitOfWork, EUnitOfWork>();
                }

                return _container;
            }
        }

        public static T Init<T>(string connection)
        {
            return Container.Resolve<T>(
                new ParameterOverride("connection", connection));
        }
    }
}