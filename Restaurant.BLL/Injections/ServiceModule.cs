using Restaurant.DAL.Interfaces;
using Restaurant.DAL.Repositories;
using Restaurant.DAL.Utilities;
using Unity;
using Unity.Resolution;

namespace Restaurant.BLL.Injections
{
    public class ServiceModule
    {
        private static IUnityContainer _container;

        private static IUnityContainer Container
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