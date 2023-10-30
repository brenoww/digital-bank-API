const pool = require("../../conexao");
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaSegura = await bcrypt.hash(senha, 10);

        const usuario = await pool.query("insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id, nome, email", [
            nome,
            email,
            senhaSegura,
        ]);
        return res.status(201).json(usuario.rows[0]);

    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do sistema" })
    }
};

module.exports = cadastrarUsuario;