const { contas } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");


const validarExclusao = (req, res, next) => {
    const indexConta = indexDaConta(req.params.numeroConta);

    if (contas[indexConta].saldo !== 0) {
        return res.status(400).json({ mensagem: "O saldo deve ser zero para excluir a conta!" });
    }
    next();
}

module.exports = validarExclusao