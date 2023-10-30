const pool = require("../../conexao");

const listarTransacoes = async (req, res) => {
    const { id: usuario_id } = req.usuarioLogado;

    try {
        const { rows } = await pool.query("select * from transacoes where usuario_id = $1", [usuario_id]);

        return res.status(200).json(rows);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do sistema" });
    }
};

module.exports = listarTransacoes;
