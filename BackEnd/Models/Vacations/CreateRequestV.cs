using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Vacations
{
    public class CreateRequestV
    {

        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Class { get; set; }

        [Required]
        public string TypeOfVacations { get; set; }

        [Required]
        public string Competition { get; set; }

        [Required]
        public string TypeOfTraining { get; set; }
    }
}
