// OS MIDDLEWARES FORAM SEPARADOS DO SERVIDOR
const app = require('./app');

// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./routes');

// const validateJWT = require('./auth/validateJWT');

const PORT = process.env.PORT || 8080;

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const apiRoutes = express.Router();

// apiRoutes.get('/api/posts', validateJWT, routes.getPosts);
// apiRoutes.post('/api/users', routes.createUsers);
// apiRoutes.post('/api/login', routes.login);

// app.use(apiRoutes);

app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));