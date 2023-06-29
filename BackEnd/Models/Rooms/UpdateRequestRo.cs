using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Rooms
{
    public class UpdateRequestRo
    {
        public string Teacher { get; set; }
        public string Department { get; set; }
        public string Class { get; set; }
        public string TypeOfActivity { get; set; }
    }
}
