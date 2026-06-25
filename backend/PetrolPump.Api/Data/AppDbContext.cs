using Microsoft.EntityFrameworkCore;
using PetrolPump.Api.Models;

namespace PetrolPump.Api.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<DispensingRecord> DispensingRecords { get; set; }
    }
}
