const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./controllers/errorMiddleware');
const User = require('./controllers/User');

const PORT = process.env.PORT || 3000;
const PATH = process.env.API_PATH || '/';

const server = express();
server.use(bodyParser.json());

const app = express.Router();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/user', User.create);

app.use(errorMiddleware.errorMiddleware);

server.use(PATH, app);
server.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));
