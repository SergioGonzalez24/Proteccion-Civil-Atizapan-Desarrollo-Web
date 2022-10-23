using JWTAuth.WebApi.Models;

namespace JWTAuth.WebApi.Interface
{
    public interface IReportes
    {
        public List<Reporte> GetReporteDetails();

        public Reporte GetReporteDetails(int id);

        public void AddReporte(Reporte reporte);

        public void UpdateReporte(Reporte reporte);
        public bool CheckReporte(int id);

    }
}
