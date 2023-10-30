const { contas } = require("../bancodedados");
const indexDaConta = require("../utilitarios/indexDaConta");

const validarTransferencia = (req, res, next) => {
    const { senha, valor } = req.body;
    const numeroContaOrigem = req.body.numero_conta_origem;
    const numeroContaDestino = req.body.numero_conta_destino;
    const indexDaContaOrigem = indexDaConta(numeroContaOrigem);
    const indexDaContaDestino = indexDaConta(numeroContaDestino);

    if (!numeroContaOrigem) {
        return res.status(400).json({ mensagem: "O número da conta de origem é obrigatório!" });
    }
    if (!numeroContaDestino) {
        return res.status(400).json({ mensagem: "O número da conta de destino é obrigatório!" });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: "O  valor é obrigatório!" });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: "Informe um valor válido!" });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: "A senha da conta é obrigatória!" });
    }
    if (indexDaContaOrigem === -1) {
        return res.status(404).json({ mensagem: "Conta de origem para o numero informado não foi encontrada ou não existe." });
    }
    if (contas[indexDaContaOrigem].usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha incorreta!" });
    }
    if (contas[indexDaContaOrigem].saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }
    if (indexDaContaDestino === -1) {
        return res.status(404).json({ mensagem: "Conta de destino para o numero informado não foi encontrada ou não existe." });
    }
    next();
}

module.exports = validarTransferencia