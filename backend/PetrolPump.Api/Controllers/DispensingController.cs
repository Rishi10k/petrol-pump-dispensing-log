using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetrolPump.Api.Data;
using PetrolPump.Api.Models;

namespace PetrolPump.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DispensingController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public DispensingController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // POST api/dispensing
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] DispensingRecordDto dto)
        {
            string proofPath = string.Empty;

            if (dto.PaymentProof != null)
            {
                var uploadsFolder = Path.Combine(_env.ContentRootPath, "Uploads");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}_{dto.PaymentProof.FileName}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                    await dto.PaymentProof.CopyToAsync(stream);

                proofPath = fileName;
            }

            var record = new DispensingRecord
            {
                DispenserNo = dto.DispenserNo,
                Quantity = dto.Quantity,
                VehicleNumber = dto.VehicleNumber,
                PaymentMode = dto.PaymentMode,
                PaymentProofPath = proofPath,
                Timestamp = DateTime.UtcNow
            };

            _context.DispensingRecords.Add(record);
            await _context.SaveChangesAsync();

            return Ok(record);
        }

        // GET api/dispensing
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? dispenserNo,
            [FromQuery] string? paymentMode,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            var query = _context.DispensingRecords.AsQueryable();

            if (!string.IsNullOrEmpty(dispenserNo))
                query = query.Where(r => r.DispenserNo == dispenserNo);

            if (!string.IsNullOrEmpty(paymentMode))
                query = query.Where(r => r.PaymentMode == paymentMode);

            if (startDate.HasValue)
                query = query.Where(r => r.Timestamp >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(r => r.Timestamp <= endDate.Value.AddDays(1));

            var records = await query.OrderByDescending(r => r.Timestamp).ToListAsync();
            return Ok(records);
        }

        // GET api/dispensing/proof/filename.pdf
        [AllowAnonymous]
        [HttpGet("proof/{fileName}")]
        public IActionResult GetProof(string fileName)
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Uploads", fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var ext = Path.GetExtension(fileName).ToLower();
            var contentType = ext switch
            {
                ".pdf" => "application/pdf",
                ".png" => "image/png",
                ".jpg" or ".jpeg" => "image/jpeg",
                _ => "application/octet-stream"
            };

            return PhysicalFile(filePath, contentType, enableRangeProcessing: true);
        }
    }

    public class DispensingRecordDto
    {
        public string DispenserNo { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public string VehicleNumber { get; set; } = string.Empty;
        public string PaymentMode { get; set; } = string.Empty;
        public IFormFile? PaymentProof { get; set; }
    }
}