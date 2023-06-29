using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Rooms;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomsController : ControllerBase
    {
        private IRoomService _roomService;
        private IMapper _mapper;

        public RoomsController(
            IRoomService roomService,
            IMapper mapper)
        {
            _roomService = roomService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var rooms = _roomService.GetAll();
            return Ok(rooms);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var room = _roomService.GetById(id);
            return Ok(room);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestRo model)
        {
            _roomService.Create(model);
            return Ok(new { message = "Room created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestRo model)
        {
            _roomService.Update(id, model);
            return Ok(new { message = "Room updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _roomService.Delete(id);
            return Ok(new { message = "Room deleted" });
        }
    }
}
