namespace JWTAuth.WebApi.Models
{
    public class Reporte
    {
        public int Id { get; set; }
        public int Evento_id { get; set; }
        public string? Prioridad { get; set; }
        public string? Estatus { get; set; }
        public string? Verificacion { get; set; }
        public static implicit operator Reporte(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}