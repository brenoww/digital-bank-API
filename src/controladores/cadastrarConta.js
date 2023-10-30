const { contas } = require("../bancodedados");
let indice = 1;

const cadastrarConta = (req, res) => {
    const usuario = req.body
    const novaConta = {
        numero: (indice++).toString(),
        saldo: 0,
        usuario
    }

    contas.push(novaConta);

    return res.status(201).json();
}


module.exports = cadastrarConta