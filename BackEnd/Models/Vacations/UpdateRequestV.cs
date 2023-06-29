using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Vacations
{
    public class UpdateRequestV
    {
        public string Teacher { get; set; }
        public string Class { get; set; }
        public string TypeOfVacations { get; set; }
        public string Competition { get; set; }
        public string TypeOfTraining { get; set; }
    }
}
