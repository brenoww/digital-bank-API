const pool = require("../../conexao");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require("../../senhaJwt");

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await pool.query('select * from usuarios where email = $1', [email]);
        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

        const senhaVerificada = await bcrypt.compare(senha, usuario.rows[0].senha);
        if (!senhaVerificada) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

        const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, { expiresIn: "8h" });

        const { senha: _, ...usuarioLogado } = usuario.rows[0];

        return res.status(200).json({ usuario: usuarioLogado, token })

    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

module.exports = login;