using JWTAuth.WebApi.Models;

namespace JWTAuth.WebApi.Interface
{
    public interface IDirectorios
    {
        public List<Directorio> GetDirectorioDetails();

        public Directorio GetDirectorioDetails(int id);

        public void AddDirectorio(Directorio evento);



    }
}


