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
    [Route("api/reporte")]
    [ApiController]

    public class ReporteController : ControllerBase
    {
        private readonly IReportes _IReporte;


        public ReporteController(IReportes IReporte)
        {
            _IReporte = IReporte;
        }




        // GET: api/alertas>
        [Route("showall")]
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Reporte>>> Get()
        {
            return await Task.FromResult(_IReporte.GetReporteDetails());
        }


       

        [HttpGet("{id}")]
        public async Task<ActionResult<Reporte>> Get(int id)
        {
            var reporte = await Task.FromResult(_IReporte.GetReporteDetails(id));
            if (reporte == null)
            {
                return NotFound();
            }
            return reporte;
        }



  





        [Route("add")]
        [HttpPost]
        public async Task<ActionResult<Reporte>> Post2(Reporte reporte)
        {
            _IReporte.AddReporte(reporte);
            //return await Task.FromResult(CreatedAtAction("GetEmployees", new { id = employee.EmployeeID }, employee));
            return await Task.FromResult(BadRequest("successfully added"));
        }


        // PUT api/reporte/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Reporte>> Put(int id, Reporte reporte)
        {

            if (id != reporte.Id)
            {
                return BadRequest();
            }
            try
            {
                _IReporte.UpdateReporte(reporte);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReporteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return await Task.FromResult(reporte);
        }

        private bool ReporteExists(int id)
        {
            return _IReporte.CheckReporte(id);
        }




    }
}
