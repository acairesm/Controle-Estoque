import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produto } from '../services/produtos.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="salvar()" class="form">
      <input formControlName="nome" placeholder="Nome do produto" />
      <button type="submit">
        {{ produto ? 'Atualizar' : 'Adicionar' }}
      </button>
    </form>
  `,
  styles: [`
    .form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    input {
      flex: 1;
      padding: 8px;
    }
    button {
      padding: 8px 16px;
      background-color: #0eb85a;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;

    }
  `]
})
export class ProdutoFormComponent implements OnChanges {
  @Input() produto?: Produto;
  @Output() submitForm = new EventEmitter<string>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['']
    });
  }

  ngOnChanges() {
    if (this.produto) {
      this.form.patchValue(this.produto);
    }
  }

  salvar() {
    this.submitForm.emit(this.form.value.nome!);
    this.form.reset();
  }
}
