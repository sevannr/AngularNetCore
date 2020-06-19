using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularNetCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetCore.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AddressesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("delete/list")]
        public async Task<IActionResult> DeleteList([FromBody] List<int> ids)
        {
            try
            {
                ids.Select(id => _context.Remove(_context.Addresses.Find(id))).ToList();
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
            return Ok();
        }
    }
}