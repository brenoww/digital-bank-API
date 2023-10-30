const pool = require("../../conexao");

const excluirTransacao = async (req, res) => {
    const { id: transacao_id } = req.params;
    const { id: usuario_id } = req.usuarioLogado;

    try {
        await pool.query("delete from transacoes where id = $1 and usuario_id = $2", [transacao_id, usuario_id]);

        return res.status(204).json();
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do sistema" });
    }
};

module.exports = excluirTransacao;
