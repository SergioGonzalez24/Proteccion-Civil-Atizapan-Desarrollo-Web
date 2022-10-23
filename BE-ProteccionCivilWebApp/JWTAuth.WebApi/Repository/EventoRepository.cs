using JWTAuth.WebApi.Interface;
using JWTAuth.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace JWTAuth.WebApi.Repository
{
    public class EventoRepository : IEventos
    {
        readonly DatabaseContext _dbContext = new();

        public EventoRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Evento> GetEventoDetails()
        {
            try
            {
                return _dbContext.Eventos.ToList();
            }
            catch
            {
                throw;
            }
        }



        public Evento GetEventoDetails(int id)
        {
            try
            {
                Evento? evento = _dbContext.Eventos.Find(id);
                if (evento != null)
                {
                    return evento;
                }
                else
                {
                    throw new ArgumentNullException();
                }
            }
            catch
            {
                throw;
            }
        }

        public void AddEvento(Evento evento)
        {
            try
            {
                
                _dbContext.Eventos.Add(evento);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

       

       
    }
}
