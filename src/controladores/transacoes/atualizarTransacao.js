const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const transacao_id = req.params.id;

    try {
        await pool.query("update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6", [
            descricao,
            valor,
            data,
            categoria_id,
            tipo,
            transacao_id,
        ]);

        return res.status(204).json();
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do sistema" });
    }
};

module.exports = atualizarTransacao;
