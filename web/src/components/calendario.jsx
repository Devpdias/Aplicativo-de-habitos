import { useState, useEffect } from "react"

function Calendario() {
    const [estatisticaMes, setEstatisticaMes] = useState([])
    useEffect(() => {
        async function buscarEstatisticaMes() {
            const resposta = await fetch('http://localhost:3220/habitos/estatisticas/mes')
            const dados = await resposta.json()
            setEstatisticaMes(dados.estatisticaMes)
        }
        buscarEstatisticaMes()
    }, [])
    const data = new Date()
    const ano = data.getFullYear()
    const mes = data.getMonth()
    const primeiroDiaMes = new Date(ano, mes, 1)
    const espacosVazios = primeiroDiaMes.getDay()

    const vazios = Array(espacosVazios).fill(null)
    const celulasCompletas = [...vazios, ...estatisticaMes]
    const diaSemanaAbreviado = ["D", "S", "T", "Q", "Q", "S", "S"]

    return (
        <div>
            <h2>Calendário</h2>
            <div className="calendarioGrid">
                {diaSemanaAbreviado.map((dia, indice) => (
                    <div key={indice} style= {{color:"black"}}>{dia}</div>
                ))}
            </div>
            <div className="calendarioGrid">
                {celulasCompletas.map((celula, indice) => (
                    celula === null ? <div key={indice}></div> : <div
                        key={indice}
                        style={{
                            backgroundColor: `rgba(34, 197, 94, ${celula.porcentagem / 100})`,
                            color: celula.porcentagem > 0 ? "white" : "black"
                        }}
                    >
                        {new Date(celula.dia + "T00:00:00").getDate()}
                    </div>))}
            </div>
        </div>
    )
}

export default Calendario 