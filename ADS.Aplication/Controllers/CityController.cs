using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ADS.Aplication.Extensions;
using ADS.Domain.Core;
using ADS.Domain.Helpers;
using ADS.Domain.ViewModels;
using ADS.Infrastructure;
using ADS.Infrastructure.Extensions;
using ADS.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
        public async Task<IActionResult> getCity([FromQuery] QueryParameters queryParameters)
        {

            var query = context.Cities.ProjectTo<CityViewModel>(_mapper.ConfigurationProvider);

            if (!String.IsNullOrEmpty(queryParameters.Active))
            {
                query = query.Sort(queryParameters.Active, queryParameters.Direction);
            }

            var paginationMetadata = query.GetPaginationViewModel(queryParameters);
            var cities = new CityViewModelsWithPaginationModels
            {
                cities = query.Skip(paginationMetadata.Skip).Take(queryParameters.PageCount),
                pagination = paginationMetadata
            };

            return Ok(cities);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCity([FromBody] CityViewModel model)
        {
            try
            {
                IsValidModel(model);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState.GetFullErrorMessage());
                }
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

        [HttpPut]
        public async Task<IActionResult> EditCity([FromBody] CityViewModel model)
        {
            IsValidModel(model);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFullErrorMessage());
            }
            var city = context.Cities.FirstOrDefault(x => x.Id == model.Id);
            if (city == null)
                return NotFound();
            
            _mapper.Map(model, city);
            
            context.Cities.Update(city);
            await context.SaveChangesAsync();
            return Ok();
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

        private void IsValidModel(CityViewModel model)
        {
            if (!model.IsValidateName(model.Name))
            {
                ModelState.AddModelError(nameof(model), $"Названия полей должны быть больше 100 или меньше 5");
            }
        }
    }
}