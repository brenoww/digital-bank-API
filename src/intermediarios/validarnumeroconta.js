const indexDaConta = require("../utilitarios/indexDaConta");

const validarNumeroConta = (req, res, next) => {
    const numeroConta = req.params.numeroConta ?? req.body.numero_conta ?? req.query.numero_conta;
    const indexConta = indexDaConta(numeroConta);

    if (!numeroConta) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório!" });
    }
    if (Number(numeroConta) === NaN || !Number.isInteger(Number(numeroConta)) || Number(numeroConta) === 0) {
        return res.status(400).json({ mensagem: "O ID deve ser um número válido." });
    }
    if (indexConta === -1) {
        return res.status(404).json({ mensagem: "Conta para o numero informado não foi encontrada ou não existe." });
    }
    return next();
}

module.exports = validarNumeroConta