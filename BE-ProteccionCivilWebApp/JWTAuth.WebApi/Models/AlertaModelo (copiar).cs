namespace JWTAuth.WebApi.Models
{
    public class LoginUserModelo
    {
        
        public string? Estatus { get; set; }
        

        public static implicit operator LoginUserModelo(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}