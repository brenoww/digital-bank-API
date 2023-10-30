const pool = require("../conexao");

const validarDadosTransacao = async (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const transacao_id = req.params.id;
    const { id: usuario_id } = req.usuarioLogado;

    try {
        const { rows: categoria, rowCount: contagemCategoria } = await pool.query("select * from categorias where id = $1", [categoria_id]);

        if (req.method !== "GET" && req.method !== "DELETE") {
            if (!descricao || !valor || !data || !categoria_id || !tipo) {
                return res.status(400).json({ mensagem: "Existem campos que não foram informados, não sendo possível realizar esta requisição." });
            }
            if (descricao.trim() == "" || String(valor).trim() == "" || data.trim() == "" || String(categoria_id).trim() == "" || tipo.trim() == "") {
                return res.status(400).json({ mensagem: "Existem campos em branco, não sendo possível realizar esta requisição" });
            }
            if (tipo.toLowerCase() !== "entrada" && tipo.toLowerCase() !== "saida") {
                return res.status(400).json({ mensagem: "Insira um tipo de transação válido." });
            }
            if (contagemCategoria < 1) {
                return res.status(404).json({ mensagem: "A categoria inserida para esta transação não existe no banco de dados." });
            }
        }

        const { rowCount: contagemTransacao } = await pool.query("select * from transacoes where id = $1 and usuario_id = $2", [transacao_id, usuario_id]);

        if (transacao_id && contagemTransacao < 1) {
            return res.status(404).json({ mensagem: "A transacao para o id inserido não existe ou não pertence ao usuario." });
        }
        res.locals.categoria = categoria[0];

        next();
    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno do sistema" });
    }
};

module.exports = validarDadosTransacao;
