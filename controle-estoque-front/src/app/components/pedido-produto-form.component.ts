import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pedido } from '../services/pedidos.service';
import { Produto } from '../services/produtos.service';

export interface PedidoProdutoFormValue {
  pedidoId: number;
  produtoId: number;
}

@Component({
  selector: 'app-pedido-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="salvar()" class="form">
      <label>
        Pedido
        <select formControlName="pedidoId">
          <option [ngValue]="null">Selecione</option>
          <option *ngFor="let pedido of pedidos" [value]="pedido.id">
            #{{ pedido.id }} - {{ pedido.data | date: 'short' }}
          </option>
        </select>
      </label>

      <label>
        Produto
        <select formControlName="produtoId">
          <option [ngValue]="null">Selecione</option>
          <option *ngFor="let produto of produtos" [value]="produto.id">
            {{ produto.nome }}
          </option>
        </select>
      </label>

      <button type="submit" [disabled]="form.invalid">Vincular produto</button>
    </form>
  `,
  styles: [`
    .form {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 12px;
      align-items: end;
      margin-bottom: 20px;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-weight: 600;
    }

    select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #d8d8d8;
    }

    button {
      padding: 8px 16px;
      background-color: #7b2ff7;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class PedidoProdutoFormComponent implements OnChanges {
  @Input() pedidos: Pedido[] = [];
  @Input() produtos: Produto[] = [];
  @Output() submitForm = new EventEmitter<PedidoProdutoFormValue>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      pedidoId: [null, Validators.required],
      produtoId: [null, Validators.required]
    });
  }

  ngOnChanges() {
    if (!this.pedidos.length) {
      this.form.patchValue({ pedidoId: null });
    }

    if (!this.produtos.length) {
      this.form.patchValue({ produtoId: null });
    }
  }

  salvar() {
    const { pedidoId, produtoId } = this.form.value;

    if (!pedidoId || !produtoId) {
      return;
    }

    this.submitForm.emit({ pedidoId, produtoId });
    this.form.reset();
  }
}
