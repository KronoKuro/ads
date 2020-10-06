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
    public class ApartmentController : Controller
    {
        private readonly IMapper _mapper;
        protected readonly IUnitOfWork unitOfWork;

        public ApartmentController(IMapper mapper, IUnitOfWork _unitOfWork)
        {
            _mapper = mapper;
            unitOfWork = _unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> getAprartments([FromQuery] Guid houseId, [FromQuery] QueryParameters queryParameters)
        {
            var house = await unitOfWork
                .GetRepository<House>()
                .GetQuery()
                .Include(x => x.Street)
                .ProjectTo<HouseViewModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(c => c.Id == houseId);

            var query = unitOfWork.GetRepository<Apartment>()
                .GetQuery()
                .Include(x => x.House)
                .ThenInclude(x => x.ManagmentCompany)
                .Where(s => s.HouseId == houseId)
                .ProjectTo<ApartmentViewModel>(_mapper.ConfigurationProvider);

            if (!String.IsNullOrEmpty(queryParameters.Active))
            {
                query = query.Sort(queryParameters.Active, queryParameters.Direction);
            }

            var paginationMetadata = query.GetPaginationViewModel(queryParameters);

            var apartments = new EnumerableWithPaginationModelViewModel<HouseViewModel, ApartmentViewModel>
            {
                Entity = house,
                RelationEntities = query.Skip(paginationMetadata.Skip).Take(queryParameters.PageCount),
                Pagination = paginationMetadata
            };

            return Ok(apartments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateApartment([FromBody] ApartmentViewModel model)
        {
            try
            {
               // IsValidModel(model);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState.GetFullErrorMessage());
                }
                var apartment = new Apartment();
                apartment = _mapper.Map(model, apartment);
                unitOfWork.GetRepository<Apartment>().Add(apartment);
                await unitOfWork.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        public async Task<IActionResult> EditApartment([FromBody] ApartmentViewModel model)
        {
           // IsValidModel(model);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFullErrorMessage());
            }
            var repos = unitOfWork.GetRepository<Apartment>();
            var apartment = await repos.GetFirstOrDefaultAsync(x => x.Id == model.Id);
            if (apartment == null)
                return NotFound();
            
            _mapper.Map(model, apartment);

            repos.Update(apartment);
            await unitOfWork.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveApartment(string id)
        {
            try
            {
                var guid = Guid.Parse(id);
                var repos =  unitOfWork.GetRepository<Apartment>();
                var apartment = await repos.GetFirstOrDefaultAsync(x => x.Id == guid);
                if (apartment == null)
                    return NotFound();
                repos.Remove(apartment);
                await unitOfWork.SaveChangesAsync();
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