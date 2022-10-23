using JWTAuth.WebApi.Interface;
using JWTAuth.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace JWTAuth.WebApi.Repository
{
    public class AlertaRepository : IAlertas
    {
        readonly DatabaseContext _dbContext = new();

        public AlertaRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Alerta> GetAlertaDetails()
        {
            try
            {
                return _dbContext.Alertas.ToList();
            }
            catch
            {
                throw;
            }
        }



        public Alerta GetAlertaDetails(int id)
        {
            try
            {
                Alerta? alerta = _dbContext.Alertas.Find(id);
                if (alerta != null)
                {
                    return alerta;
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

        public void AddAlerta(Alerta alerta)
        {
            try
            {
                _dbContext.Alertas.Add(alerta);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }



        public bool CheckAlerta(int id)
        {
            return _dbContext.Alertas.Any(e => e.Id == id);
        }

       
    }
}
