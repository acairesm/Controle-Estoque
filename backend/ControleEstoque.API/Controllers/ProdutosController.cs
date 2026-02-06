using ControleEstoque.API.Data;
using ControleEstoque.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleEstoque.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProdutosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/produtos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Produto>>> GetAll()
    {
        var produtos = await _context.Produtos
            .AsNoTracking()
            .ToListAsync();

        return Ok(produtos);
    }

    // GET: api/produtos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Produto>> GetById(int id)
    {
        var produto = await _context.Produtos
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        if (produto == null)
            return NotFound($"Produto com id {id} não encontrado.");

        return Ok(produto);
    }

    // POST: api/produtos
    [HttpPost]
    public async Task<ActionResult<Produto>> Create([FromBody] Produto produto)
    {
        if (string.IsNullOrWhiteSpace(produto.Nome))
            return BadRequest("O nome do produto é obrigatório.");

        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetById),
            new { id = produto.Id },
            produto
        );
    }

    // PUT: api/produtos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Produto produto)
    {
        if (id != produto.Id)
            return BadRequest("Id da URL diferente do corpo da requisição.");

        var existe = await _context.Produtos.AnyAsync(p => p.Id == id);
        if (!existe)
            return NotFound($"Produto com id {id} não encontrado.");

        _context.Entry(produto).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/produtos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);

        if (produto == null)
            return NotFound($"Produto com id {id} não encontrado.");

        _context.Produtos.Remove(produto);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
