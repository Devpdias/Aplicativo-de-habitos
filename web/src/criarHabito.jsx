import './estilos/App.css';
import { useState } from 'react';
import { Link } from "react-router";

function CriarHabito() {

  const [nome, setNome] = useState("")

  async function mandarHabito() {
    const resposta = await fetch("http://localhost:3220/habitos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome
      })
    })

    const dados = await resposta.json()

    console.log(dados)
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Hábitos</h1>
          <input value={nome} type="text" id="inHabito" placeholder='Escreva Novo Hábito' onChange={(e) => setNome(e.target.value)} />
        </div>
        <div
          className="divBotoes">
          <button
            type="button"
            className="adicionar"
            onClick={mandarHabito}
          >
            Adicionar
          </button>
          <Link to="/habitos">
          <button
            type="submit"
            className="verificar">
            Verificar
          </button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default CriarHabito