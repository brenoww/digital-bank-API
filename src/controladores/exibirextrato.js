const { depositos, saques, transferencias } = require("../bancodedados");

const exibirExtrato = (req, res) => {
    const numeroConta = req.query.numero_conta;

    const extratoDepositos = depositos.filter((deposito) => {
        return deposito.numero_conta === numeroConta;
    });
    const extratoSaques = saques.filter((saque) => {
        return saque.numero_conta === numeroConta;
    });
    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numeroConta;
    });
    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numeroConta;
    });

    const novoExtrato = {
        depositos: extratoDepositos,
        saques: extratoSaques,
        transferenciasEnviadas,
        transferenciasRecebidas
    }

    return res.status(200).json(novoExtrato);
}

module.exports = exibirExtrato