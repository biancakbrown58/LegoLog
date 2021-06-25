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
        public bool InProgress { get; set; }
        public string Price { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public bool FinishedLego { get; set; }

        public int BuildListId { get; set; }
        public int WishListId { get; set; }
    }
}