import '../estilos/app.css';
import { useState } from 'react';

function CriarHabito({aoCriar}) {

  const [nome, setNome] = useState("")

  function mandarHabito() {
    aoCriar(nome)
    setNome("")
  }

  return (
    <>
      <section id="center">
        <div>
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
        </div>
      </section>
    </>
  )
}

export default CriarHabito