const { contas } = require("../bancodedados");

const indexDaConta = (numeroConta) => {
    const contaIndex = contas.findIndex((conta) => {
        return conta.numero === numeroConta;
    });

    return contaIndex;
}

module.exports = indexDaConta 