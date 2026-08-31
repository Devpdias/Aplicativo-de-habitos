const express = require("express");
const router = express.Router();
const knex = require("knex");

const db = knex(require("./knexfile.js").development);

router.post("/", async (req, res) => {
  const { nome } = req.body;

  const [id] = await db("habitos").insert({
    nome,
  });

  res.json({
    id,
    nome,
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

router.get("/estatisticas/dias", async (req, res) => {
  const data = new Date().toISOString().split("T")[0];
  const habitosConcluidosHoje = await db("registros").where({ data });
  const habitos = await db.select("*").from("habitos");

  const numHabitosFeitosHoje = habitosConcluidosHoje.length;
  const numHabitos = habitos.length;

  const porcentagem = (numHabitosFeitosHoje / numHabitos) * 100;

  res.json({
    numHabitosFeitosHoje,
    numHabitos,
    porcentagem,
  });
});

router.get("/estatisticas/semana", async (req, res) => {
  const hoje = new Date();
  const diaDaSemana = hoje.getDay();

  const diasDeSegunda = diaDaSemana === 0 ? 6 : diaDaSemana - 1;

  hoje.setDate(hoje.getDate() - diasDeSegunda);

  const dataSegunda = hoje.toISOString().split("T")[0];
  const dataHoje = new Date().toISOString().split("T")[0];

  const habitos = await db.select("*").from("habitos");
  const totalHabito = habitos.length;

  const registroSemana = await db("registros").whereBetween("data", [
    dataSegunda,
    dataHoje,
  ]);

  let diasSemana = [];
  for (let i = 0; i < 7; i++) {
    const diaAtual = new Date(dataSegunda);
    diaAtual.setDate(diaAtual.getDate() + i);
    const diaDaSemana = diaAtual.toISOString().split("T")[0];
    diasSemana.push(diaDaSemana);
  }

  const EstatisticaSemana = diasSemana.map((diaSemana) => {
    const quantidadeConcluido = registroSemana.filter((registro) => {
      return registro.data === diaSemana;
    }).length;

    const porcentagem = (quantidadeConcluido / totalHabito) * 100;
    return {
      dia: diaSemana,
      quantidadeConcluido: quantidadeConcluido,
      porcentagem: porcentagem,
    };
  });

  res.json({
    EstatisticaSemana,
  });
});

router.get("/estatisticas/mes", async (req, res) => {
  const hoje = new Date();

  const mes = hoje.getMonth();
  const ano = hoje.getFullYear();

  const ultimoDiaMes = new Date(ano, mes + 1, 0);
  const primeiroDiaMes = new Date(ano, mes, 1);

  const ultimoDiaDoMes = ultimoDiaMes.toISOString().split("T")[0];
  const primeiroDiaDoMes = primeiroDiaMes.toISOString().split("T")[0];

  const registroMes = await db("registros").whereBetween("data", [
    primeiroDiaDoMes,
    ultimoDiaDoMes,
  ]);

  let diasMes = [];
  for (let i = 0; i < ultimoDiaMes.getDate(); i++) {
    const diaAtual = new Date(primeiroDiaDoMes);
    diaAtual.setDate(diaAtual.getDate() + i);
    const diaDoMes = diaAtual.toISOString().split("T")[0];
    diasMes.push(diaDoMes);
  }

  const estatisticaMes = diasMes.map((diaMes) => {
    const quantidadeConcluido = registroMes.filter((registro) => {
      return registro.data === diaMes;
    }).length;
    return { dia: diaMes, quantidadeConcluido: quantidadeConcluido };
  });

  res.json({
    estatisticaMes,
  });
});

module.exports = router;
