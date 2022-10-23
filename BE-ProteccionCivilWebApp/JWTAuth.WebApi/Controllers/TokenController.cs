using JWTAuth.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWTAuth.WebApi.Controllers
{
    [Route("api/admin")]
    [ApiController]

    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly DatabaseContext _context;

        public TokenController(IConfiguration config, DatabaseContext context)
        {
            _configuration = config;
            _context = context;
        }



        [Route("token")]
        [HttpPost]
        public async Task<IActionResult> Post(Administradores _userData)
        {
            if (_userData != null && _userData.Email != null && _userData.Passsword != null)
            {
                var user = await GetUser2(_userData.Email, _userData.Passsword);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Id", user.Id.ToString()),
                        new Claim("DisplayName", user.FullName),
                        new Claim("Email", user.Email)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(50),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }


        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<LoginUserModelo>> Post2(Administradores _userData)
        {

            LoginUserModelo respuesta = new();

            if (_userData != null && _userData.Email != null && _userData.Passsword != null)
            {
                var user1 = await GetUser1(_userData.Email);

                if (user1 != null)
                {
                    user1 = await GetUser2(_userData.Email, _userData.Passsword);

                    if (user1 != null)
                    {

                        respuesta.Estatus = "Credenciales exitosas";
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

        private async Task<Administradores> GetUser1(string email)
        {
            return await _context.Administradoress.FirstOrDefaultAsync(u => u.Email == email);
        }


    
        private async Task<Administradores> GetUser2(string email, string password)
        {
            return await _context.Administradoress.FirstOrDefaultAsync(u => u.Email == email && u.Passsword == password);
        }
    }
  

}
