const express = require("express");
//Controladores de Usuário
const cadastrarUsuario = require("./controladores/usuarios/cadastrarUsuario");
const login = require("./controladores/usuarios/login");
const detalharUsuario = require("./controladores/usuarios/detalharUsuario");
const atualizarUsuario = require("./controladores/usuarios/atualizarUsuario");
//Controladores de Categoria
const listarCategorias = require("./controladores/categorias/listarCategorias");
//Controladores de Transação
const cadastrarTransacao = require("./controladores/transacoes/cadastrarTransacao");
const listarTransacoes = require("./controladores/transacoes/listarTransacoes");
const detalharTransacao = require("./controladores/transacoes/detalharTransacao");
const atualizarTransacao = require("./controladores/transacoes/atualizarTransacao");
const excluirTransacao = require("./controladores/transacoes/excluirTransacao");
const exibirExtrato = require("./controladores/transacoes/exibirExtrato");
//Middleswares
const autenticarLogin = require("./intermediarios/autenticacao");
const validarDadosCadastro = require("./intermediarios/validarDadosCadastro");
const validarDadosLogin = require("./intermediarios/validarDadosLogin");
const validarDadosAtualizacao = require("./intermediarios/validarDadosAtualizacao");
const validarDadosTransacao = require("./intermediarios/validarDadosTransacao");

//Rotas
const rotas = express();
//Rotas de usuário comum
rotas.post("/usuario", validarDadosCadastro, cadastrarUsuario);
rotas.post("/login", validarDadosLogin, login);

//Autenticação
rotas.use(autenticarLogin);
//Rotas autenticadas de usuário
rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarDadosAtualizacao, atualizarUsuario);
//Rotas autenticadas de categoria
rotas.get("/categoria", listarCategorias);
//Rotas autenticadas de transação
rotas.post("/transacao", validarDadosTransacao, cadastrarTransacao);
rotas.get("/transacao", listarTransacoes);
rotas.get("/transacao/extrato", exibirExtrato);
rotas.get("/transacao/:id", validarDadosTransacao, detalharTransacao);
rotas.put("/transacao/:id", validarDadosTransacao, atualizarTransacao);
rotas.delete("/transacao/:id", validarDadosTransacao, excluirTransacao);

module.exports = rotas;
