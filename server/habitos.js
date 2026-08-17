const express = require("express");
const router = express.Router();
const knex = require("knex");

const db = knex(require("./knexfile.js").development);

router.post("/", async (req, res) => {
  const { nome } = req.body;

  const [id] = await db("habitos").insert({
    nome,
    concluido: false,
  });

  res.json({
    id, 
    nome, 
    concluido: false
  });
});

router.get("/", async (req, res) => {
  const habitos = await db.select("*").from("habitos");
  res.json(habitos);
});

router.patch("/:id", async(req, res) => {
  const { id } = req.params;
  const { concluido } = req.body;
  await db("habitos").where({ id }).update({ concluido });

  res.json({
    mensagem: "hábito atualizado"
  });
});

  router.delete("/:id", async(req, res) => {
    const { id } = req.params
    await db("habitos").where({ id }).delete()
    res.json({
      mensagem: "hábito deletado"
    });
  });

module.exports = router;
