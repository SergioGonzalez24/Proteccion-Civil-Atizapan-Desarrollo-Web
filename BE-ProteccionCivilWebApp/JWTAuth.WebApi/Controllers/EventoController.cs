using JWTAuth.WebApi.Interface;
using JWTAuth.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JWTAuth.WebApi.Controllers
{
    //[Authorize]
    [Route("api/evento")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IEventos _IEvento;

        private readonly IReportes _IReporte;

        private readonly IUsers _IUser;

        public EventoController(IReportes IAlerta, IEventos IEvento, IUsers IUser)
        {
            _IEvento = IEvento;
            _IReporte = IAlerta;
            _IUser = IUser;

        }

        // GET: api/evento>
        [Route("showall")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Evento>>> Get()
        {
            return await Task.FromResult(_IEvento.GetEventoDetails());
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Evento>> Get67(int id)
        {
            var eventos = await Task.FromResult(_IEvento.GetEventoDetails(id));
            if (eventos == null)
            {
                return NotFound();
            }
            return eventos;
        }



        

        // POST api/evento
        [Route("add")]
        [HttpPost]
        public async Task<ActionResult<Reporte>> Post(Evento evento)
        {


        List<int> prioridadAlta = new List<int>() {
            2, 3, 9, 5
        };

        List<int> prioridadMedia = new List<int>() {
            8, 6, 4
        };
        


            evento.Order_date = DateTime.Now;
            _IEvento.AddEvento(evento);

            Reporte x = new Reporte();
            x.Evento_id = evento.Id;
            x.Estatus = "Pendiente";

            if (prioridadAlta.Any(item => item == evento.Directorio_id))
            {
                x.Prioridad = "Alta";
            }

            else
            {
                if (prioridadMedia.Any(item => item == evento.Directorio_id))
                {
                    x.Prioridad = "Media";
                }
                else
                {
                    x.Prioridad = "Baja";

                }

            }


            x.Verificacion = _IUser.GetUserDetails(evento.Users_id).FullName + " " +_IUser.GetUserDetails(evento.Users_id).Telefono;

            _IReporte.AddReporte(x);

            //return await Task.FromResult(CreatedAtAction("GetEmployees", new { id = employee.EmployeeID }, employee));
            return await Task.FromResult(x);
        }

       

       




    }
}
