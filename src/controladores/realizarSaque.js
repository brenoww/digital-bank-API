const { contas, saques } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");
const { format } = require("date-fns");

const realizarSaque = (req, res) => {
    const numeroConta = req.body.numero_conta;
    const { valor } = req.body;

    const contaIndex = indexDaConta(numeroConta);
    const data = format(new Date(), "yyyy-MM-dd HH:mm:ss")

    contas[contaIndex].saldo -= valor;

    const novoSaque = {
        data,
        numero_conta: numeroConta,
        valor
    }
    saques.push(novoSaque);

    return res.status(201).json();
}

module.exports = realizarSaque