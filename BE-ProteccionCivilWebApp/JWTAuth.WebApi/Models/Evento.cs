namespace JWTAuth.WebApi.Models
{
    public class Evento
    {
        public int Id { get; set; }
        public DateTime? Order_date { get; set; }
        public int Users_id { get; set; }
        public int Directorio_id { get; set; }
        public string? Order_location { get; set; }

        public static implicit operator Evento(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}