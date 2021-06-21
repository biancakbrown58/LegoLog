using System;

namespace LegoLog.Models
{
    public class Lego
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Theme { get; set; }
        public string PieceCount { get; set; }
        public string SerialNumber { get; set; }
        public int BuildListId { get; set; }
    }
}