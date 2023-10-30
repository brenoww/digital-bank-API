const { contas } = require("../bancodedados");

const validarDados = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (email.includes(" ") || !email.includes("@")) {
        return res.status(400).json({ mensagem: "O email inválido!" });
    }
    if (contas.some((conta) => {
        return conta.usuario.email === email;
    })) {
        return res.status(400).json({ mensagem: "O email informado já existe cadastro!" })
    }
    if (contas.some((conta) => {
        return conta.usuario.cpf === cpf;
    })) {
        return res.status(400).json({ mensagem: "O cpf informado já existe cadastro!" })
    }
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!\nFavor preencher os dados!" });
    }
    next();
}

module.exports = validarDados