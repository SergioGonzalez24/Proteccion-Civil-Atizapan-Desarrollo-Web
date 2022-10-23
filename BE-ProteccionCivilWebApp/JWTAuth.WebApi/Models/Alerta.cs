namespace JWTAuth.WebApi.Models
{
    public class Alerta
    {
        public int Id { get; set; }
        public DateTime? Order_date { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public string? Prioridad { get; set; }


        public static implicit operator Alerta(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}
