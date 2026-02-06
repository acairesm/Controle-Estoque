import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosService, Produto } from '../services/produtos.service';
import { ProdutoFormComponent } from './produto-form.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ProdutoFormComponent],
  template: `
    <div class="container">
      <h2>Produtos</h2>

      <app-produto-form
        [produto]="produtoEditando"
        (submitForm)="salvar($event)">
      </app-produto-form>

      <ul>
        <li *ngFor="let p of produtos()">
          {{ p.nome }}
          <div>
            <button class="btn-editar"
            (click)="editar(p)">Editar</button>
            <button class="btn-excluir"
            (click)="excluir(p.id)">Excluir</button>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: auto;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    button {
      margin-left: 5px;
      
    }
    .btn-editar{
       padding: 8px 16px;
      background-color: #1460ec;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      }
      .btn-excluir{
        padding: 8px 16px;
      background-color: #db0f00;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      }
  `]
})
export class ProdutosComponent implements OnInit {
  private service = inject(ProdutosService);
  produtos = this.service.produtos;
  produtoEditando?: Produto;

  ngOnInit() {
    this.service.listar().subscribe();
  }

  salvar(nome: string) {
    if (this.produtoEditando) {
      this.service.atualizar({
        id: this.produtoEditando.id,
        nome
      }).subscribe();
      this.produtoEditando = undefined;
    } else {
      this.service.adicionar(nome).subscribe();
    }
  }

  editar(produto: Produto) {
    this.produtoEditando = produto;
  }

  excluir(id: number) {
    this.service.excluir(id).subscribe();
  }
}
