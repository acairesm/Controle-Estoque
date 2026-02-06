import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  private api = 'http://localhost:5003/api/Produtos';

  produtos = signal<Produto[]>([]);

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Produto[]>(this.api).pipe(
      tap(lista => this.produtos.set(lista))
    );
  }

  adicionar(nome: string) {
    return this.http.post<Produto>(this.api, { nome }).pipe(
      tap(() => this.listar().subscribe())
    );
  }

  atualizar(produto: Produto) {
    return this.http.put(`${this.api}/${produto.id}`, produto).pipe(
      tap(() => this.listar().subscribe())
    );
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`).pipe(
      tap(() => this.listar().subscribe())
    );
  }
}
