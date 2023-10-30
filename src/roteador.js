const express = require("express");

//controladores
const listarContas = require("./controladores/listarContas");
const cadastrarConta = require("./controladores/cadastrarConta");
const atualizarConta = require("./controladores/atualizarconta");
const excluirConta = require("./controladores/excluirconta");
const realizarDeposito = require("./controladores/realizarDeposito");
const realizarSaque = require("./controladores/realizarSaque");
const realziarTransferencia = require("./controladores/realizarTransferencia");
const exibirSaldo = require("./controladores/exibirSaldo");
const exibirExtrato = require("./controladores/exibirExtrato");

//validacoes
const validarSenhaBanco = require("./intermediarios/validarSenhaBanco");
const validarDados = require("./intermediarios/validarDados");
const validarNumeroConta = require("./intermediarios/validarNumeroConta");
const validarExclusao = require("./intermediarios/validarExclusao");
const validarTransacao = require("./intermediarios/validarTransacao");
const validarSaque = require("./intermediarios/validarSaque");
const validarTransferencia = require("./intermediarios/validarTransferencia");
const validarAcesso = require("./intermediarios/validarAcesso");


const rotas = express();

//rotas contas
rotas.get("/contas", validarSenhaBanco, listarContas);
rotas.post("/contas", validarDados, cadastrarConta);
rotas.put("/contas/:numeroConta/usuario", validarNumeroConta, validarDados, atualizarConta);
rotas.delete("/contas/:numeroConta", validarNumeroConta, validarExclusao, excluirConta);
rotas.get("/contas/saldo", validarNumeroConta, validarAcesso, exibirSaldo);
rotas.get("/contas/extrato", validarNumeroConta, validarAcesso, exibirExtrato);

//rotas transacoes
rotas.post("/transacoes/depositar", validarNumeroConta, validarTransacao, realizarDeposito);
rotas.post("/transacoes/sacar", validarNumeroConta, validarSaque, realizarSaque);
rotas.post("/transacoes/transferir", validarTransferencia, realziarTransferencia);

module.exports = rotas