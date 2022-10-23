namespace JWTAuth.WebApi.Models
{
    public class Directorio
    {
        public int Id { get; set; }
 
        public string? Departamento { get; set; }
        public string? Contacto{ get; set; }
        public string? Coordenadas { get; set; }


        public static implicit operator Directorio(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}