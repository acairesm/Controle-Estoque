import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Produto } from './produtos.service';

export interface PedidoProduto {
  id: number;
  pedidoId: number;
  produtoId: number;
  produto?: Produto;
}

export interface Pedido {
  id: number;
  data: string;
  pedidoProdutos: PedidoProduto[];
}

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private api = 'http://localhost:5003/api/Pedidos';

  pedidos = signal<Pedido[]>([]);

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Pedido[]>(this.api).pipe(
      tap(lista => this.pedidos.set(lista))
    );
  }

  criar() {
    return this.http.post<Pedido>(this.api, {}).pipe(
      tap(() => this.listar().subscribe())
    );
  }

  adicionarProduto(pedidoId: number, produtoId: number) {
    return this.http.post(
      `${this.api}/${pedidoId}/produtos/${produtoId}`,
      {}
    ).pipe(
      tap(() => this.listar().subscribe())
    );
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`).pipe(
      tap(() => this.listar().subscribe())
    );
  }
}
