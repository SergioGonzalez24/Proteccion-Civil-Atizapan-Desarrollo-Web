namespace JWTAuth.WebApi.Models
{
    public class LoginUserModelo2
    {
        
        public string? Estatus { get; set; }
        public int? user_id { get; set; }
        

        public static implicit operator LoginUserModelo2(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}