// ESTE SERÁ EXPORTADO PARA OS TESTES COM CHAIHTTP. ESTE ARQUIVO NÃO É O SERVIDOR.
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// const validateJWT = require('./auth/validateJWT');

// const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.get('/api/posts', /* validateJWT, */ routes.getPosts);
apiRoutes.post('/api/users', routes.createUsers);
apiRoutes.post('/api/login', routes.login);

app.use(apiRoutes);

// app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));

// é necessária a exportação do `app`, já que precisaremos dele nos testes com `chaiHttp`. Este será exportado para /src/api/server.js

module.exports = app;
