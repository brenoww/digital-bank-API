const { contas } = require("../bancodedados");

const exibirSaldo = (req, res) => {
    const numeroConta = req.query.numero_conta;

    const { saldo } = contas.find((conta) => {
        return conta.numero === numeroConta;
    });

    return res.status(200).json({ saldo: saldo });
}

module.exports = exibirSaldo