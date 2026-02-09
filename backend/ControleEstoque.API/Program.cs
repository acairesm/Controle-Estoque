using ControleEstoque.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Force default URL in development if none is provided
if (builder.Environment.IsDevelopment() &&
    string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("ASPNETCORE_URLS")))
{
    builder.WebHost.UseUrls("http://localhost:5003");
}

// Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy
                .SetIsOriginAllowed(origin =>
                    origin.StartsWith("http://localhost:") ||
                    origin.StartsWith("https://localhost:"))
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Banco de dados (PostgreSQL)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        "Host=aws-1-us-east-2.pooler.supabase.com;Port=6543;Database=postgres;Username=postgres.zeybhstlqdbieyhnoarb;Password=senhamuitoForte;Ssl Mode=Require;Trust Server Certificate=true;Timeout=15;Command Timeout=15;Keepalive=30;Pooling=true;Minimum Pool Size=0;Maximum Pool Size=10;No Reset On Close=true;Max Auto Prepare=0"
    )
);

var app = builder.Build();

// Pipeline HTTP
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowAngular");

app.MapControllers();

app.Run();
