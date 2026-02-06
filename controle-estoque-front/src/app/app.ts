import { Component, signal } from '@angular/core';
import { ProdutosComponent } from './components/produtos.component';

@Component({
  selector: 'app-root',
  imports: [ProdutosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('controle-estoque-front');
}
