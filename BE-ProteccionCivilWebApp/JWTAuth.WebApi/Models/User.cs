namespace JWTAuth.WebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Passsword { get; set; }
        public string? Cp { get; set; }
        public string? Colonia { get; set; }
        public string? Calle { get; set; }
        public string? Numero { get; set; }
        public string? Telefono { get; set; }

        public static implicit operator User(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}