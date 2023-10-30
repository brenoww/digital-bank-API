const pool = require("../conexao");

const validarDadosAtualizacao = async (req, res, next) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuarioLogado;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Existem campos que não foram informados, não sendo possível realizar esta requisição." });
    }

    if (nome.trim() == "" || email.trim() == "" || String(senha).trim() == "") {
        return res.status(400).json({ mensagem: "Existem campos em branco, não sendo possível realizar esta requisição" });
    }

    if (email.indexOf("@") < 0 || email[0] == "." || email.slice(-1) == ".") {
        return res.status(400).json({ mensagem: "Insira um e-mail válido." });
    }

    const { rows } = await pool.query("select * from usuarios where email = $1", [email]);

    if (rows[0].id !== id) {
        return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
    }

    next();
};

module.exports = validarDadosAtualizacao;
