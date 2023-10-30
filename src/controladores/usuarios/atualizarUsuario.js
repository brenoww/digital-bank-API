const pool = require("../../conexao");
const bcrypt = require("bcrypt");

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuarioLogado;

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await pool.query(`update usuarios set nome = $1, email = $2, senha = $3 where id = $4`, [nome, email, senhaCriptografada, id]);

        return res.status(204).json();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
};

module.exports = atualizarUsuario;