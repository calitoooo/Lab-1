using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Rooms;

namespace WebApi.Services
{
    public interface IRoomService
    {
        IEnumerable<Room> GetAll();
        Room GetById(int id);
        void Create(CreateRequestRo model);
        void Update(int id, UpdateRequestRo model);
        void Delete(int id);
    }

    public class RoomService : IRoomService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public RoomService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Room> GetAll()
        {
            return _context.Rooms;
        }

        public Room GetById(int id)
        {
            return getRoom(id);
        }

        public void Create(CreateRequestRo model)
        {
           
            var room = _mapper.Map<Room>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Rooms.Add(room);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestRo model)
        {
            var room = getRoom(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, room);
            _context.Rooms.Update(room);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var room = getRoom(id);
            _context.Rooms.Remove(room);
            _context.SaveChanges();
        }

        // helper methods

        private Room getRoom(int id)
        {
            var room = _context.Rooms.Find(id);
            if (room == null) throw new KeyNotFoundException("Room not found");
            return room;
        }
    }
}