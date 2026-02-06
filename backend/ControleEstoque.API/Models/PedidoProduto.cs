using System.Text.Json.Serialization;

namespace ControleEstoque.API.Models;

public class PedidoProduto
{
    public int Id { get; set; }

    public int PedidoId { get; set; }
    [JsonIgnore]
    public Pedido Pedido { get; set; } = null!;

    public int ProdutoId { get; set; }
    public Produto Produto { get; set; } = null!;
}
