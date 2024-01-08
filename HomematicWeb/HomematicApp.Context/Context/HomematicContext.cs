using HomematicApp.Context.DbModels;
using Microsoft.EntityFrameworkCore;
using Action = HomematicApp.Context.DbModels.Action;

namespace HomematicApp.Context.Context
{
    public class HomematicContext : DbContext
    {
        public HomematicContext(DbContextOptions<HomematicContext> options)
        : base(options)
        { }

        public DbSet<User> users { get; set; }
        public DbSet<Action> actions { get; set; }
        public DbSet<Parameter> parameters { get; set; }
        public DbSet<Preset> presets { get; set; }
        public DbSet<EspData> temperature_ESP { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Action>()
				.Property(e => e.Action_Type)
				.HasConversion<string>();
		}
	}
}
