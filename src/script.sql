--criação da base de dados
create database dindin;
--criação da tabela usuarios
create table usuarios (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null);
--criação da tabela categorias
create table categorias (
    id serial primary key,
    descricao text unique);
--criação da tabela transacoes
create table transacoes (
    id serial primary key,
    descricao text,
    valor integer,
    data date,
    categoria_id integer references categorias(id),
    usuario_id integer references usuarios(id),
    tipo text not null);
--criação de categorias
insert into categorias (descricao)
    values ('Alimentação'), ('Assinaturas e Serviços'), ('Casa'), ('Mercado'), ('Cuidados Pessoais'), ('Educação'), 
    ('Família'), ('Lazer'), ('Pets'), ('Presentes'), ('Roupas'), ('Saúde'), ('Transporte'), ('Salário'), ('Vendas'),
    ('Outras Receitas'), ('Outras Despesas');