const pool = require("../../conexao");

const listarCategorias = async (req, res) => {
    try {
        const { rows } = await pool.query("select * from categorias");

        return res.status(200).json(rows);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do sistema" });
    }
};

module.exports = listarCategorias;
