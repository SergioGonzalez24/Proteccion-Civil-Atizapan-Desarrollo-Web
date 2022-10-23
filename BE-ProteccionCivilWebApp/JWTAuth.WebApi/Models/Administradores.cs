namespace JWTAuth.WebApi.Models
{
    public class Administradores
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Passsword { get; set; }
        public string? FullName { get; set; }
        
        public static implicit operator Evento(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}
