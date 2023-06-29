using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Vacations;

namespace WebApi.Services
{
    public interface IVacationService
    {
        IEnumerable<Vacation> GetAll();
        Vacation GetById(int id);
        void Create(CreateRequestV model);
        void Update(int id, UpdateRequestV model);
        void Delete(int id);
    }

    public class VacationService : IVacationService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public VacationService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Vacation> GetAll()
        {
            return _context.Vacations;
        }

        public Vacation GetById(int id)
        {
            return getVacation(id);
        }

        public void Create(CreateRequestV model)
        {
            
            var vacation = _mapper.Map<Vacation>(model);

           
            _context.Vacations.Add(vacation);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestV model)
        {
            var vacation = getVacation(id);

            
            _mapper.Map(model, vacation);
            _context.Vacations.Update(vacation);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var vacation = getVacation(id);
            _context.Vacations.Remove(vacation);
            _context.SaveChanges();
        }

        // helper methods

        private Vacation getVacation(int id)
        {
            var vacation = _context.Vacations.Find(id);
            if (vacation == null) throw new KeyNotFoundException("Vacation not found");
            return vacation;
        }
    }
}