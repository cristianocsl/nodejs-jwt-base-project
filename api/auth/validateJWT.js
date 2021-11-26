const jwt = require('jsonwebtoken');
const model = require('../../models/user');

const segredo = 'minhasenha';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']; // Embora na requisição "Authorization" com inicial maiúscula, o console de req.headers mostra que a inicial vem minúscula.
console.log(req.headers)
  if (!token) return res.status(401).json({ error: 'Token não encontrado' });

  try {
    const decoded = jwt.verify(token, segredo);

    const user = await model.findUser(decoded.data.username);

    if (!user) return res.status(401).json({ message: 'Erro ao procurar usuário do token' });

    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({ message: err.message});
  }
}
