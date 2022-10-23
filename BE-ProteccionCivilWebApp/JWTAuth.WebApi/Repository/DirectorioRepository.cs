using JWTAuth.WebApi.Interface;
using JWTAuth.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace JWTAuth.WebApi.Repository
{
    public class DirectorioRepository : IDirectorios
    {
        readonly DatabaseContext _dbContext = new();

        public DirectorioRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Directorio> GetDirectorioDetails()
        {
            try
            {
                return _dbContext.Directorios.ToList();
            }
            catch
            {
                throw;
            }
        }



        public Directorio GetDirectorioDetails(int id)
        {
            try
            {
                Directorio? evento = _dbContext.Directorios.Find(id);
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

        public void AddDirectorio(Directorio evento)
        {
            try
            {
                
                _dbContext.Directorios.Add(evento);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

      
    }
}
