const validarTransacao = (req, res, next) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({ mensagem: "O  valor é obrigatório!" });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: "Informe um valor válido!" });
    }
    next();
}

module.exports = validarTransacao