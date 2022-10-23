namespace JWTAuth.WebApi.Models
{
    public class Email
    {
        
        public string? Mail { get; set; }
        

        public static implicit operator Email(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}