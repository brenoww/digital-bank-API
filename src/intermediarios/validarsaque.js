const { contas } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");


const validarSaque = (req, res, next) => {
    const { valor, senha } = req.body;
    const numeroConta = req.body.numero_conta;
    const indexConta = indexDaConta(numeroConta);

    if (!senha) {
        return res.status(400).json({ mensagem: "A senha da conta é obrigatória!" });
    }
    if (contas[indexConta].usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha incorreta!" });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: "O valor é obrigatório!" });
    }
    if (contas[indexConta].saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }
    next();
}

module.exports = validarSaque