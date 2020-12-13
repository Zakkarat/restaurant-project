using System.Collections.Generic;

namespace Restaurant.BLL.DTOobjects
{
    public class TableDTO
    {
        public int Id { get; set; }
        public int Number { get; set; }
        
        public List<int> Orders { get; set; }
    }
}