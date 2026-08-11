const express = require('express')
const cors = require('cors');
const app = express()
const port = 3220;

app.use(cors());
app.use(express.json())
app.post("/habitos", (req, res) => {
  console.log(req.body)

  res.json({
    mensagem: "Hábito Recebido!"
  })
})

app.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`)
});
