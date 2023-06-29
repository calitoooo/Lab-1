using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Rooms
{
    public class CreateRequestRo
    {

        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Department { get; set; }

        [Required]
        public string Class { get; set; }

        [Required]
        public string TypeOfActivity { get; set; }
    }
}
