const express = require('express');

const projectRouter = require('./data/project/projectRouter.js');
const actionRouter = require('./data/action/actionRouter');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);



const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));