﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Feedback
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string Message { get; set; }
        public string TypeOfFeedback { get; set; }
    }
}
