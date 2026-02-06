import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../services/pedidos.service';
import { ProdutosService } from '../services/produtos.service';
import { PedidoProdutoFormComponent, PedidoProdutoFormValue } from './pedido-produto-form.component';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, PedidoProdutoFormComponent],
  template: `
    <section class="container">
      <header class="header">
        <div>
          <h2>Pedidos</h2>
          <p class="subtitle">Gerencie pedidos e vincule produtos.</p>
        </div>
        <button class="btn-primary" (click)="criarPedido()">Novo pedido</button>
      </header>

      <app-pedido-produto-form
        [pedidos]="pedidos()"
        [produtos]="produtos()"
        (submitForm)="adicionarProduto($event)">
      </app-pedido-produto-form>

      <div class="table-wrapper" *ngIf="pedidos().length; else vazio">
        <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Data</th>
              <th>Produtos vinculados</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let pedido of pedidos()">
              <td>#{{ pedido.id }}</td>
              <td>{{ pedido.data | date: 'short' }}</td>
              <td>
                <div class="produtos">
                  <span *ngFor="let item of pedido.pedidoProdutos">
                    {{ item.produto?.nome || 'Produto sem nome' }}
                  </span>
                </div>
              </td>
              <td>
                <button class="btn-danger" (click)="apagarPedido(pedido.id)">
                  Apagar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #vazio>
        <p class="empty">Nenhum pedido cadastrado ainda.</p>
      </ng-template>

      <p class="summary">Total de pedidos: {{ totalPedidos() }}</p>
    </section>
  `,
  styles: [`
    .container {
      background: #ffffff;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      gap: 12px;
    }

    .subtitle {
      margin: 4px 0 0;
      color: #606060;
    }

    .btn-primary {
      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      background-color: #1460ec;
      color: #fff;
      cursor: pointer;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      text-align: left;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      vertical-align: top;
    }

    .produtos {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .produtos span {
      background: #f3f0ff;
      color: #3b2ea3;
      padding: 4px 8px;
      border-radius: 999px;
      font-size: 13px;
    }

    .empty {
      color: #6a6a6a;
      padding: 12px 0;
    }

    .summary {
      margin-top: 16px;
      font-weight: 600;
      color: #2f2f2f;
    }

    .btn-danger {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background-color: #e53935;
      color: #fff;
      cursor: pointer;
    }
  `]
})
export class PedidosComponent implements OnInit {
  private pedidosService = inject(PedidosService);
  private produtosService = inject(ProdutosService);

  pedidos = this.pedidosService.pedidos;
  produtos = this.produtosService.produtos;
  totalPedidos = computed(() => this.pedidos().length);

  ngOnInit() {
    this.produtosService.listar().subscribe();
    this.pedidosService.listar().subscribe();
  }

  criarPedido() {
    this.pedidosService.criar().subscribe();
  }

  adicionarProduto(valor: PedidoProdutoFormValue) {
    this.pedidosService.adicionarProduto(valor.pedidoId, valor.produtoId).subscribe();
  }

  apagarPedido(id: number) {
    this.pedidosService.excluir(id).subscribe();
  }
}
