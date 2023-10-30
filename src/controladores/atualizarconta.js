const { contas } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");

const atualizarConta = (req, res) => {
    const { numeroConta } = req.params
    const usuario = req.body
    const contaIndex = indexDaConta(numeroConta);

    contas[contaIndex].usuario = usuario;

    return res.status(204).json();
}

module.exports = atualizarConta