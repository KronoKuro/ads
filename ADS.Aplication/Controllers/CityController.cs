using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ADS.Aplication.Extensions;
using ADS.Domain.Core;
using ADS.Domain.Helpers;
using ADS.Domain.ViewModels;
using ADS.Infrastructure;
using ADS.Infrastructure.Abstract;
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
        protected readonly IUnitOfWork unitOfWork;

        public CityController(ADCContext _context, IMapper mapper, IUnitOfWork _unitOfWork)
        {
            context = _context;
            _mapper = mapper;
            unitOfWork = _unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> getCity([FromQuery] QueryParameters queryParameters)
        {

            var repos = unitOfWork
                .GetRepository<City>();

            var query = repos.GetQuery()
                 .ProjectTo<CityViewModel>(_mapper.ConfigurationProvider);

            if (!String.IsNullOrEmpty(queryParameters.Active))
            {
                query = query.Sort(queryParameters.Active, queryParameters.Direction);
            }

            var paginationMetadata = query.GetPaginationViewModel(queryParameters);
            var cities = new CityViewModelsWithPaginationModels
            {
                Cities = query.Skip(paginationMetadata.Skip).Take(queryParameters.PageCount),
                Pagination = paginationMetadata
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
                var repos = unitOfWork.GetRepository<City>();
                repos.Add(city);
                await unitOfWork.SaveChangesAsync();
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
            var cities = unitOfWork.GetRepository<City>();
            var city = cities.GetFirstOrDefault(x => x.Id == model.Id);
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
                var cities = unitOfWork.GetRepository<City>();
                var city = await cities.GetFirstOrDefaultAsync(x => x.Id == guid);
                if (city == null)
                    return NotFound();
                cities.Remove(city);
                await unitOfWork.SaveChangesAsync();
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