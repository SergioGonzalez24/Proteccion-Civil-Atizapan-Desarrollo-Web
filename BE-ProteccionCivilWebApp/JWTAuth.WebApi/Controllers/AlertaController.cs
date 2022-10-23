using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JWTAuth.WebApi.Interface;
using JWTAuth.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JWTAuth.WebApi.Controllers
{
    //[Authorize]
    [Route("api/alerta")]
    [ApiController]
    public class AlertaController : ControllerBase
    {
        private readonly IAlertas _IAlerta;


        public AlertaController(IAlertas IAlerta)
        {
            _IAlerta = IAlerta;
        }




        // GET: api/alertas>
        [Route("showall")]
        [HttpGet]

        public async Task<ActionResult<AlertaModelo>> Get()

        {

            AlertaModelo xx = new();
            xx.Alertas = _IAlerta.GetAlertaDetails();
            return await Task.FromResult(xx);
        }



        [Route("add")]
        [HttpPost]
        public async Task<ActionResult<LoginUserModelo>> Post2(Alerta alerta)
        {
            LoginUserModelo respuesta = new();
            alerta.Order_date = DateTime.Now;
            _IAlerta.AddAlerta(alerta);
            //return await Task.FromResult(CreatedAtAction("GetEmployees", new { id = employee.EmployeeID }, employee));
            respuesta.Estatus = "Añadido exitosamente ";
            return await Task.FromResult(respuesta);
        }

        // GET api/evento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alerta>> Get(int id)
        {
            var alerta = await Task.FromResult(_IAlerta.GetAlertaDetails(id));
            if (alerta == null)
            {
                return NotFound();
            }
            return alerta;
        }





    }
}
