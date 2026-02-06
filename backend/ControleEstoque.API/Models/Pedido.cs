using System;
using System.Collections.Generic;

namespace ControleEstoque.API.Models;

public class Pedido
{
    public int Id { get; set; }

    public DateTime Data { get; set; }

    public ICollection<PedidoProduto> PedidoProdutos { get; set; }
        = new List<PedidoProduto>();
}
