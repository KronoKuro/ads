using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ADS.Aplication.Extensions;
using ADS.Domain.Core;
using ADS.Domain.Helpers;
using ADS.Domain.ViewModels;
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
    public class ManagmentCompanyController : Controller
    {

        private readonly IMapper _mapper;
        protected readonly IUnitOfWork unitOfWork;

        public ManagmentCompanyController(IMapper mapper, IUnitOfWork _unitOfWork)
        {
            _mapper = mapper;
            unitOfWork = _unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> getCompanies([FromQuery] Guid id, [FromQuery] QueryParameters queryParameters)
        {
            var query = unitOfWork
                .GetRepository<ManagmentCompany>()
                .GetQuery()
                .ProjectTo<ManagmentCompanyViewModel>(_mapper.ConfigurationProvider);

            if (!String.IsNullOrEmpty(queryParameters.Active))
            {
                query = query.Sort(queryParameters.Active, queryParameters.Direction);
            }

            var paginationMetadata = query.GetPaginationViewModel(queryParameters);
            var companies = new EntityWithPaginationViewModel<ManagmentCompanyViewModel>
            {
                Entities = query.Skip(paginationMetadata.Skip).Take(queryParameters.PageCount),
                Pagination = paginationMetadata
            };

            return Ok(companies);
        }

        [Route("lookup")]
        [HttpGet]
        public async Task<IActionResult> getCompaniesState()
        {
            var repos = unitOfWork
                .GetRepository<ManagmentCompany>();

            var query = repos.GetQuery()
                 .ProjectTo<ManagmentCompanyViewModel>(_mapper.ConfigurationProvider);

            return Ok(query);
        }


        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] ManagmentCompanyViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState.GetFullErrorMessage());
                }
                var company = new ManagmentCompany();
                company = _mapper.Map(model, company);
                var repos = unitOfWork.GetRepository<ManagmentCompany>();
                repos.Add(company);
                await unitOfWork.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        public async Task<IActionResult> EditCompany([FromBody] ManagmentCompanyViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFullErrorMessage());
            }
            var companies = unitOfWork.GetRepository<ManagmentCompany>();
            var company = companies.GetFirstOrDefault(x => x.Id == model.Id);
            if (company == null)
                return NotFound();

            _mapper.Map(model, company);

            companies.Update(company);
            await unitOfWork.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveCompany(string id)
        {
            try
            {
                var guid = Guid.Parse(id);
                var companies  = unitOfWork.GetRepository<ManagmentCompany>();
                var comapny = await companies.GetFirstOrDefaultAsync(x => x.Id == guid);
                if (comapny == null)
                    return NotFound();
                companies.Remove(comapny);
                await unitOfWork.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


    }
}