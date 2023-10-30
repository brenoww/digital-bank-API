const pool = require("../../conexao");

const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body;
    const { id: usuario_id } = req.usuarioLogado;
    const { descricao: categoria_nome } = res.locals.categoria;

    try {
        const { rows } = await pool.query(
            "insert into transacoes (tipo, descricao, valor, data,usuario_id, categoria_id) values ($1, $2, $3, $4, $5, $6) returning id",
            [tipo, descricao, valor, data, usuario_id, categoria_id]
        );
        const novaTransacao = {
            id: rows[0].id,
            tipo,
            descricao,
            valor,
            data,
            usuario_id,
            categoria_id,
            categoria_nome,
        };

        return res.status(201).json(novaTransacao);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do sistema" });
    }
};

module.exports = cadastrarTransacao;
