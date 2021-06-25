using System.Collections.Generic;

namespace LegoLog.Models
{
    public class WishList
    {
        public int Id { get; set; }
        public string Theme { get; set; }

        public List<Lego> Legos { get; set; }
    }
}