namespace ControleEstoque.API.Models;

public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; }

    public ICollection<PedidoProduto> PedidoProdutos { get; set; }
}