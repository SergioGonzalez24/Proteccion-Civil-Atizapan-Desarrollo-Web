using JWTAuth.WebApi.Interface;
using JWTAuth.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace JWTAuth.WebApi.Repository
{
    public class ReporteRepository : IReportes
    {
        readonly DatabaseContext _dbContext = new();

        public ReporteRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Reporte> GetReporteDetails()
        {
            try
            {
                return _dbContext.Reportes.ToList();
            }
            catch
            {
                throw;
            }
        }



        public Reporte GetReporteDetails(int id)
        {
            try
            {
                Reporte? reporte = _dbContext.Reportes.Find(id);
                if (reporte != null)
                {
                    return reporte;
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





        public void AddReporte(Reporte reporte)
        {
            try
            {
            
                _dbContext.Reportes.Add(reporte);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }



        public void UpdateReporte(Reporte reporte)
        {
            try
            {
                _dbContext.Entry(reporte).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }


        public void AddAlerta(Evento evento)
        {
            throw new NotImplementedException();
        }


        public bool CheckReporte(int id)
        {
            return _dbContext.Reportes.Any(e => e.Id == id);
        }

    }

}
