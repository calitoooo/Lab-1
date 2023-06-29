using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Vacations;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VacationsController : ControllerBase
    {
        private IVacationService _vacationService;
        private IMapper _mapper;

        public VacationsController(
            IVacationService vacationService,
            IMapper mapper)
        {
            _vacationService = vacationService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var vacations = _vacationService.GetAll();
            return Ok(vacations);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var vacation = _vacationService.GetById(id);
            return Ok(vacation);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestV model)
        {
            _vacationService.Create(model);
            return Ok(new { message = "Vacation created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestV model)
        {
            _vacationService.Update(id, model);
            return Ok(new { message = "Vacation updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _vacationService.Delete(id);
            return Ok(new { message = "Vacation deleted" });
        }
    }
}
