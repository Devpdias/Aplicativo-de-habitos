const express = require("express");
const router = express.Router();
const knex = require("knex");

const db = knex(require("./knexfile.js").development);

router.post("/", async (req, res) => {
  const { nome } = req.body;

  await db("habitos").insert({
    nome,
    concluido: false,
  });

  res.json({
    mensagem: "hábito salvo no banco",
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

module.exports = router;
