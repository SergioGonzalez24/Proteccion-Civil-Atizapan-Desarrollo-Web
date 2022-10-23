using Microsoft.EntityFrameworkCore;

namespace JWTAuth.WebApi.Models
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User>? Users { get; set; }
        public virtual DbSet<Administradores>? Administradoress { get; set; }

        public virtual DbSet<Evento>? Eventos { get; set; }

        public virtual DbSet<Reporte>? Reportes { get; set; }
        public virtual DbSet<Directorio>? Directorios { get; set; }
        public virtual DbSet<Alerta>? Alertas { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Email)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.FullName)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.UserName)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.Passsword)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.Cp)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.Colonia)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.Calle)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.Numero)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.Telefono)
                      .HasMaxLength(50)
                      .IsUnicode(false);
            });

            modelBuilder.Entity<Administradores>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Administradores");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Passsword)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<Evento>(entity =>
            {
                entity.ToTable("Evento");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Order_date)
                      .IsUnicode(false);

                entity.Property(e => e.Users_id)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.Property(e => e.Directorio_id)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.Property(e => e.Order_location)
                      .HasMaxLength(50)
                      .IsUnicode(false);
            });

            modelBuilder.Entity<Reporte>(entity =>
            {
                entity.ToTable("Reportes");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Evento_id)
                      .IsUnicode(false);

                entity.Property(e => e.Prioridad)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.Property(e => e.Estatus)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.Property(e => e.Estatus)
                      .HasMaxLength(50)
                      .IsUnicode(false);


            });
            modelBuilder.Entity<Directorio>(entity =>
            {
                entity.ToTable("Directorio");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Departamento)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.Property(e => e.Contacto)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.Property(e => e.Coordenadas)
                      .HasMaxLength(50)
                      .IsUnicode(false);


            });


            modelBuilder.Entity<Alerta>(entity =>
            {
                entity.ToTable("Alerta");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Order_date)
                      .IsUnicode(false);

                entity.Property(e => e.Nombre)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.Property(e => e.Descripcion)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.Property(e => e.Prioridad)
                      .HasMaxLength(50)
                      .IsUnicode(false);
            });




            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
