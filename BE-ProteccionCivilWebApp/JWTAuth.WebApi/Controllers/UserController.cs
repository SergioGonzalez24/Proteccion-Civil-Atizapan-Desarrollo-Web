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
    [Authorize]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsers _IUser;
        private readonly DatabaseContext _context;

        public UserController(IUsers IEmployee, DatabaseContext context)
        {
            _IUser = IEmployee;
            _context = context;
        }

        // GET: api/user
        [Route("showAll")]
        [HttpGet]

        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await Task.FromResult(_IUser.GetUserDetails());
        }







        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<LoginUserModelo2>> Post(User _userData)
        {
            LoginUserModelo2 respuesta = new();



            if (_userData != null && _userData.Email != null && _userData.Passsword != null)
            {
                var user1 = await GetUser(_userData.Email);

                if (user1 != null)
                {
                    user1 = await GetUser2(_userData.Email, _userData.Passsword);

                    if (user1 != null)
                    {

                        var user2 = await GetUser(_userData.Email);



                        respuesta.Estatus = "Credenciales exitosas";
                        respuesta.user_id = user2.Id;
                        return await Task.FromResult(respuesta);
                    }

                    else
                    {
                        respuesta.Estatus = "contraseña incorecta";
                        return await Task.FromResult(respuesta);
                    }
                }
                else
                {
                    respuesta.Estatus = "Usuario no existe";
                    return await Task.FromResult(respuesta);
                }
            }
            else
            {
                respuesta.Estatus = "Datos incorecctos";
                return await Task.FromResult(respuesta);
            }
        }




        [Route("add")]
        [HttpPost]
        public async Task<ActionResult<LoginUserModelo>> Post2(User user)
        {
            LoginUserModelo respuesta = new();

            _IUser.AddUser(user);
            //return await Task.FromResult(CreatedAtAction("GetEmployees", new { id = employee.EmployeeID }, employee));
            respuesta.Estatus = "Añadido exitosamente ";
            return await Task.FromResult(respuesta);
        }




        [Route("add2")]
        [HttpPost]
        public async Task<ActionResult<LoginUserModelo>> GetUserñ(User id)

        {

            LoginUserModelo respuesta = new();

            var user1 = await GetUser(id.Email);

            if (user1 != null)
            {
                respuesta.Estatus = user1.Email;
                return await Task.FromResult(respuesta);


            }
            else
            {
                respuesta.Estatus = "Datos incorecctos";
                return await Task.FromResult(respuesta);
            }
        }


            // PUT api/employee/5
            [HttpPut("{id}")]
            public async Task<ActionResult<User>> Put(int id, User employee)
            {

                if (id != employee.Id)
                {
                    return BadRequest();
                }
                try
                {
                    _IUser.UpdateUser(employee);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmployeeExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return await Task.FromResult(employee);
            }

            // DELETE api/employee/5
            [HttpDelete("{id}")]
            public async Task<ActionResult<User>> Delete(int id)
            {
                var employee = _IUser.DeleteUser(id);
                return await Task.FromResult(employee);
            }

            private bool EmployeeExists(int id)
            {
                return _IUser.CheckUser(id);
            }



            private async Task<User> GetUser(string email)
            {
                return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            }


            private async Task<User> GetUser2(string email, string password)
            {
                return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Passsword == password);
            }

        }
    } 
