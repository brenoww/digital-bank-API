const pool = require("../../conexao");

const detalharTransacao = async (req, res) => {
    const { id: transacao_id } = req.params;
    const { id: usuario_id } = req.usuarioLogado;

    try {
        const { rows } = await pool.query("select * from transacoes where usuario_id = $1 and id = $2", [usuario_id, transacao_id]);

        return res.status(200).json(rows[0]);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do sistema" });
    }
};

module.exports = detalharTransacao;
