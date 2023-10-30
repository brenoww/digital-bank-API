const detalharUsuario = async (req, res) => {
    const usuario = req.usuarioLogado;

    try {
        return res.status(200).json(usuario);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = detalharUsuario;
