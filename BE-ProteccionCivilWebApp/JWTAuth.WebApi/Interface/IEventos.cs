using JWTAuth.WebApi.Models;

namespace JWTAuth.WebApi.Interface
{
    public interface IEventos
    {
        public List<Evento> GetEventoDetails();

        public Evento GetEventoDetails(int id);

        public void AddEvento(Evento evento);

        




    }
}


