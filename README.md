# Controle-Estoque

Sistema simples de controle de estoque com **API em .NET 8** e **frontend em Angular**.

## Comando rapido
Para iniciar tudo de uma vez:
```bash
cd D:\Sites\Controle-Estoque\controle-estoque-front
npm run start:full
```

## Requisitos
- .NET SDK 8
- Node.js + npm
- PostgreSQL (local ou Supabase)

## Estrutura
```
D:\Sites\Controle-Estoque
├─ backend\ControleEstoque.API
└─ controle-estoque-front
```

## Rodando a API (Backend)
1. Abra um terminal na pasta da API:
   ```bash
   cd \backend\ControleEstoque.API
   ```

2. Inicie a API:
   ```bash
   dotnet run
   ```

3. Acesse no navegador:
   ```text
   http://localhost:5003/swagger
   ```

### Observacoes
- A API sobe por padrao em `http://localhost:5003`.
- A porta pode ser alterada se estiver em uso.

## Rodando o Frontend (Angular)
1. Abra outro terminal na pasta do front:
   ```bash
   cd D:\Sites\Controle-Estoque\controle-estoque-front
   ```

2. Instale as dependencias (apenas na primeira vez):
   ```bash
   npm install
   ```

3. Inicie o front:
   ```bash
   ng serve
   ```

4. Acesse no navegador:
   ```text
   http://localhost:4200
   ```

## Rodando Front + API juntos
Na pasta do front:
```bash
cd D:\Sites\Controle-Estoque\controle-estoque-front
npm run start:full
```

> Esse comando sobe o Angular e a API simultaneamente.

## Banco de Dados
A API usa PostgreSQL via EF Core. A string de conexao fica em:
```
backend\ControleEstoque.API\Program.cs
```

### Importante
Este projeto ja esta configurado para usar o banco do Supabase do autor. 
Ao rodar a API, os dados salvos serao os mesmos do banco online compartilhado.

### Usando Supabase
1. No Supabase, va em **Project Settings > Database > Connection string**.
2. Copie a **Direct connection**.
3. Substitua a string no `Program.cs`.

Se precisar criar as tabelas rapidamente pelo SQL Editor do Supabase:
```sql
create table if not exists "Produtos" (
  "Id" serial primary key,
  "Nome" text not null
);

create table if not exists "Pedidos" (
  "Id" serial primary key,
  "Data" timestamptz not null
);

create table if not exists "PedidoProdutos" (
  "Id" serial primary key,
  "PedidoId" int not null references "Pedidos"("Id") on delete cascade,
  "ProdutoId" int not null references "Produtos"("Id") on delete cascade
);
```

## Endpoints principais
### Produtos
- `GET /api/Produtos`
- `GET /api/Produtos/{id}`
- `POST /api/Produtos`
- `PUT /api/Produtos/{id}`
- `DELETE /api/Produtos/{id}`

### Pedidos
- `GET /api/Pedidos`
- `GET /api/Pedidos/{id}`
- `POST /api/Pedidos`
- `DELETE /api/Pedidos/{id}`
- `POST /api/Pedidos/{pedidoId}/produtos/{produtoId}`

## Problemas comuns
- **CORS**: verifique se a API esta rodando e se o front aponta para `http://localhost:5003`.
- **Requisicoes pendentes**: normalmente a API nao esta rodando ou a porta esta errada.
- **Sem tabelas no Supabase**: rode as migrations ou use o SQL acima.

## Licenca
Projeto de estudo.
