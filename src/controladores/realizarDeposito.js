const { contas, depositos } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");
const { format } = require("date-fns");

const realizarDeposito = (req, res) => {
    const numeroConta = req.body.numero_conta;
    const valor = req.body.valor;

    const contaIndex = indexDaConta(numeroConta);
    const data = format(new Date(), "yyyy-MM-dd HH:mm:ss")

    contas[contaIndex].saldo += valor;

    const novoDeposito = {
        data,
        numero_conta: numeroConta,
        valor
    }
    depositos.push(novoDeposito);

    return res.status(201).json();
}

module.exports = realizarDeposito;