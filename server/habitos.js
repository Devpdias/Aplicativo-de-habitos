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
    concluido: false,
  });
});

router.get("/", async (req, res) => {
  const habitos = await db.select("*").from("habitos");
  const data = new Date().toISOString().split("T")[0];
  const concluidoHoje = await db("registros").where({ data });

  const habitosComStatus = habitos.map((habito) => {
    const concluido = concluidoHoje.some(
      (registro) => registro.habito_id === habito.id,
    );
    return { ...habito, concluidoHoje: concluido };
  });
  res.json(habitosComStatus);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { concluido } = req.body;
  await db("habitos").where({ id }).update({ concluido });

  res.json({
    mensagem: "hábito atualizado",
  });
});

router.patch("/:id/registros", async (req, res) => {
  const { id } = req.params;
  const data = new Date().toISOString().split("T")[0];

  const registroExistente = await db("registros")
    .where({ data, habito_id: id })
    .first();

  let concluido = false;

  if (!registroExistente) {
    await db("registros").insert({
      habito_id: id,
      data: data,
      concluido: true,
    });
    concluido = true;
  } else {
    await db("registros").where({ id: registroExistente.id }).delete();
    concluido = false;
  }

  res.json({
    concluido: concluido,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db("habitos").where({ id }).delete();
  res.json({
    mensagem: "hábito deletado",
  });
});

module.exports = router;
