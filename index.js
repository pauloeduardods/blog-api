const express = require('express');
const bodyParser = require('body-parser');
const ErrorMiddleware = require('./middlewares/ErrorMiddleware');
const { tokenAuthentication } = require('./middlewares/AuthMiddleware');
const User = require('./controllers/Users');
const Categories = require('./controllers/Categories');
const Posts = require('./controllers/Posts');

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

app.post('/login', User.login);

app.use(tokenAuthentication);

app.get('/user', User.getAll);

app.get('/user/:id', User.getById);

app.get('/categories', Categories.getAll);

app.post('/categories', Categories.create);

app.post('/post', Posts.create);

app.get('/post', Posts.getAll);

app.get('/post/:id', Posts.getById);

app.use(ErrorMiddleware.errorMiddleware);

server.use(PATH, app);
server.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));
