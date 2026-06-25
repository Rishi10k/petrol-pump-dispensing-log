using System.ComponentModel.DataAnnotations.Schema;

namespace PetrolPump.Api.Models
{
    public class DispensingRecord
    {
        public int Id { get; set; }
        public string DispenserNo { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Quantity { get; set; }
        public string VehicleNumber { get; set; } = string.Empty;
        public string PaymentMode { get; set; } = string.Empty;
        public string PaymentProofPath { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
