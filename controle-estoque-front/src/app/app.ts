import { Component, signal } from '@angular/core';
import { ProdutosComponent } from './components/produtos.component';
import { PedidosComponent } from './components/pedidos.component';

@Component({
  selector: 'app-root',
  imports: [ProdutosComponent, PedidosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('controle-estoque-front');
}
