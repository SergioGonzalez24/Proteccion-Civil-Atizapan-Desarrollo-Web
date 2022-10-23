namespace JWTAuth.WebApi.Models
{
    public class AlertaModelo
    {
        
        public List<Alerta>? Alertas { get; set; }
        

        public static implicit operator AlertaModelo(Administradores v)
        {
            throw new NotImplementedException();
        }
    }
}