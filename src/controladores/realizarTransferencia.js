const { contas, transferencias } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");
const { format } = require("date-fns");

const realizarTransferencia = (req, res) => {
    const numeroContaOrigem = req.body.numero_conta_origem;
    const numeroContaDestino = req.body.numero_conta_destino;
    const { valor } = req.body

    const data = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const indexDaContaOrigem = indexDaConta(numeroContaOrigem);
    const indexDaContaDestino = indexDaConta(numeroContaDestino);

    contas[indexDaContaOrigem].saldo -= valor;
    contas[indexDaContaDestino].saldo += valor;

    const novaTransferencia = {
        data,
        numero_conta_origem: numeroContaOrigem,
        numero_conta_destino: numeroContaDestino,
        valor
    }

    transferencias.push(novaTransferencia);

    return res.status(201).json();
}

module.exports = realizarTransferencia