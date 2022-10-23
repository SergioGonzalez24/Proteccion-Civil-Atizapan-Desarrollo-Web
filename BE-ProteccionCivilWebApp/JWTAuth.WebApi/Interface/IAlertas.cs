using JWTAuth.WebApi.Models;

namespace JWTAuth.WebApi.Interface
{
    public interface IAlertas
    {
        public List<Alerta> GetAlertaDetails();

        public Alerta GetAlertaDetails(int id);

        public void AddAlerta(Alerta alerta);



        public bool CheckAlerta(int id);
    }
}
