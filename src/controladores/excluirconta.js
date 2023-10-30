const { contas } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");

const excluirConta = (req, res) => {
    const { numeroConta } = req.params
    const contaIndex = indexDaConta(numeroConta);

    contas.splice(contaIndex, 1);

    return res.status(204).json();
}

module.exports = excluirConta