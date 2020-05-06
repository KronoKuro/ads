using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ADS.Domain.ViewModels;
using ADS.Infrastructure;
using ADS.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ADS.Aplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : Controller
    {
        private ADCContext context;
        private readonly IMapper _mapper;

        public CityController(ADCContext _context, IMapper mapper)
        {
            context = _context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> getCity()
        {
            var cities = await context.Cities.ToListAsync();
            return Ok(cities);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCity([FromBody] CityViewModel model)
        {
            try
            {
                var city = new City();
                city = _mapper.Map(model, city);
                context.Cities.Add(city);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveCity(string id)
        {
            try
            {
                var guid = Guid.Parse(id);
                var city = await context.Cities.FirstOrDefaultAsync(x => x.Id == guid);
                if (city == null)
                    return NotFound();
                context.Cities.Remove(city);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}