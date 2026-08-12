const express = require("express");
const router = express.Router();
const knex = require('knex');

const db = knex(require("./knexfile.js").development)

router.post("/", async(req, res) => {
    const { nome } = req.body

    await db("habitos").insert({
    nome,
    concluido: false
    })

    res.json({
        mensagem: "hábito salvo no banco"
    })
})

module.exports = router
