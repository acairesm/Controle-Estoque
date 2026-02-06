using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ControleEstoque.API.Models;

public class Produto
{
    public int Id { get; set; }

    public string Nome { get; set; } = null!;

    [JsonIgnore]
    public ICollection<PedidoProduto> PedidoProdutos { get; set; }
        = new List<PedidoProduto>();
}
