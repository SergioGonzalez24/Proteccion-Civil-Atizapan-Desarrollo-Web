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
    [Route("api/directorio")]
    [ApiController]
    public class DirectorioController : ControllerBase
    {
        private readonly IDirectorios _IDirectorio;


        public DirectorioController(IDirectorios IDirectorio)
        {
            _IDirectorio = IDirectorio;
        }




        // GET: api/alertas>
        [Route("showall")]
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Directorio>>> Get()
        {
            return await Task.FromResult(_IDirectorio.GetDirectorioDetails());
        }





        [Route("add")]
        [HttpPost]
        public async Task<ActionResult<Directorio>> Post2(Directorio directorio)
        {
            _IDirectorio.AddDirectorio(directorio);
            //return await Task.FromResult(CreatedAtAction("GetEmployees", new { id = employee.EmployeeID }, employee));
            return await Task.FromResult(BadRequest("successfully added"));
        }



        // GET api/evento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Directorio>> Get(int id)
        {
            var directorio = await Task.FromResult(_IDirectorio.GetDirectorioDetails(id));
            if (directorio == null)
            {
                return NotFound();
            }
            return directorio;
        }



    }
}
