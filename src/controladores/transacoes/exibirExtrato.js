const pool = require("../../conexao");

const exibirExtrato = async (req, res) => {
    const { id: usuario_id } = req.usuarioLogado;
    console.log(req);
    try {
        const { rows } = await pool.query("select  tipo, sum(valor) from transacoes where usuario_id = $1 group by tipo", [usuario_id]);

        const extrato = Object.fromEntries(
            rows.map((movimentacao) => {
                return Object.values(movimentacao);
            })
        );

        for (let key in extrato) {
            extrato[key] = Number(extrato[key]);
        }

        return res.status(200).json(extrato);
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ mensagem: "Erro interno do sistema" });
    }
};

module.exports = exibirExtrato;
