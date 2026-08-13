const express = require('express')
const cors = require('cors');
const knexfile = require('./knexfile');
const app = express()
const port = 3220;
const habitos = require("./habitos.js")

app.use(cors());
app.use(express.json())

app.use('/habitos', habitos);

app.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`)
});

