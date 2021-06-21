using System;
using System.Collections.Generic;

namespace LegoLog.Models
{
    public class BuildList
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }

        public List<Lego> Legos { get; set; }

    }
}