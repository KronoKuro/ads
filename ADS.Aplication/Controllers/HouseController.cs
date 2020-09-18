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
    public class HouseController : Controller
    {
        private ADCContext context;
        private readonly IMapper _mapper;

        public HouseController(ADCContext _context, IMapper mapper)
        {
            context = _context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> getHouses([FromQuery] Guid streetId, [FromQuery] QueryParameters queryParameters)
        {
            var street = await context.Streets
                .ProjectTo<StreetViewModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(c => c.Id == streetId);

            var query = context.Houses
                .Include(x => x.Street)
                .Include(x => x.ManagmentCompany)
                .Where(s => s.StreetId == streetId)
                .ProjectTo<HouseViewModel>(_mapper.ConfigurationProvider);

            if (!String.IsNullOrEmpty(queryParameters.Active))
            {
                query = query.Sort(queryParameters.Active, queryParameters.Direction);
            }

            var paginationMetadata = query.GetPaginationViewModel(queryParameters);

            var houses = new EnumerableWithPaginationModelViewModel<StreetViewModel, HouseViewModel>
            {
                Entity = street,
                RelationEntities = query.Skip(paginationMetadata.Skip).Take(queryParameters.PageCount),
                Pagination = paginationMetadata
            };

            return Ok(houses);
        }

        [HttpPost]
        public async Task<IActionResult> CreateHouse([FromBody] HouseViewModel model)
        {
            try
            {
               // IsValidModel(model);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState.GetFullErrorMessage());
                }
                var house = new House();
                house = _mapper.Map(model, house);
                context.Houses.Add(house);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        public async Task<IActionResult> EditHouse([FromBody] HouseViewModel model)
        {
           // IsValidModel(model);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFullErrorMessage());
            }
            var houses = context.Houses.FirstOrDefault(x => x.Id == model.Id);
            if (houses == null)
                return NotFound();
            
            _mapper.Map(model, houses);
            
            context.Houses.Update(houses);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveHouse(string id)
        {
            try
            {
                var guid = Guid.Parse(id);
                var house = await context.Houses.FirstOrDefaultAsync(x => x.Id == guid);
                if (house == null)
                    return NotFound();
                context.Houses.Remove(house);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //private void IsValidModel(StreetViewModel model)
        //{
        //    if (!model.IsValidateName(model.Name))
        //    {
        //        ModelState.AddModelError(nameof(model), $"Названия полей должны быть больше 100 или меньше 5");
        //    }
        //}
    }
}