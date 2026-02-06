using ControleEstoque.API.Data;
using ControleEstoque.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleEstoque.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
    private readonly AppDbContext _context;

    public PedidosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/pedidos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pedido>>> GetAll()
    {
        return await _context.Pedidos
            .Include(p => p.PedidoProdutos)
                .ThenInclude(pp => pp.Produto)
            .ToListAsync();
    }

    // GET: api/pedidos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Pedido>> GetById(int id)
    {
        var pedido = await _context.Pedidos
            .Include(p => p.PedidoProdutos)
                .ThenInclude(pp => pp.Produto)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pedido == null)
            return NotFound();

        return pedido;
    }

    // POST: api/pedidos
    [HttpPost]
    public async Task<ActionResult<Pedido>> Create(Pedido pedido)
    {
        pedido.Data = DateTime.UtcNow;

        _context.Pedidos.Add(pedido);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = pedido.Id }, pedido);
    }

    // POST: api/pedidos/{pedidoId}/produtos/{produtoId}
    [HttpPost("{pedidoId}/produtos/{produtoId}")]
    public async Task<IActionResult> AddProduto(int pedidoId, int produtoId)
    {
        var pedido = await _context.Pedidos.FindAsync(pedidoId);
        var produto = await _context.Produtos.FindAsync(produtoId);

        if (pedido == null || produto == null)
            return NotFound();

        var pedidoProduto = new PedidoProduto
        {
            PedidoId = pedidoId,
            ProdutoId = produtoId
        };

        _context.PedidoProdutos.Add(pedidoProduto);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/pedidos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var pedido = await _context.Pedidos.FindAsync(id);

        if (pedido == null)
            return NotFound();

        _context.Pedidos.Remove(pedido);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
