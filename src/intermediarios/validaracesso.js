const { contas } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");

const validarAcesso = (req, res, next) => {
    const { senha } = req.query
    const numeroConta = req.query.numero_conta;
    const indexConta = indexDaConta(numeroConta);

    if (!numeroConta) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório!" });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: "A senha da conta é obrigatória!" });
    }
    if (contas[indexConta].usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha incorreta!" });
    }
    next();
}

module.exports = validarAcesso