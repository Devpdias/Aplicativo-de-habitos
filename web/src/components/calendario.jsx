import { useState, useEffect } from "react"

function Calendario() {
    const [estatisticaMes, setEstatisticaMes] = useState([])
    const [mesAtual, setMesAtual] = useState(new Date())

    function avancarMes() {
        const novaData = new Date(mesAtual)
        novaData.setMonth(novaData.getMonth() + 1)
        setMesAtual(novaData)
    }

    function voltarMes() {
        const novaData = new Date(mesAtual)
        novaData.setMonth(novaData.getMonth() - 1)
        setMesAtual(novaData)
    }

    function formatarDataLocal(date) {
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const dia = String(date.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    useEffect(() => {
        async function buscarEstatisticaMes() {
            const ano = mesAtual.getFullYear()
            const mes = mesAtual.getMonth() + 1
            const resposta = await fetch(`http://localhost:3220/habitos/estatisticas/mes?ano=${ano}&mes=${mes}`)
            const dados = await resposta.json()
            setEstatisticaMes(dados.estatisticaMes)
        }
        buscarEstatisticaMes()
    }, [mesAtual])
    const ano = mesAtual.getFullYear()
    const mes = mesAtual.getMonth()
    const primeiroDiaMes = new Date(ano, mes, 1)
    const espacosVazios = primeiroDiaMes.getDay()

    const vazios = Array(espacosVazios).fill(null)
    const celulasCompletas = [...vazios, ...estatisticaMes]
    const diaSemanaAbreviado = ["D", "S", "T", "Q", "Q", "S", "S"]
    const hoje = formatarDataLocal(new Date())

    return (
        <div className="calendarioContainer">
            <h2>Calendário</h2>
            <div className="calendarioNavegacao">
                <button onClick={voltarMes}>{"<"}</button>
                <span>{mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                <button onClick={avancarMes}>{">"}</button>
            </div>
            <div className="calendarioGrid">
                {diaSemanaAbreviado.map((dia, indice) => (
                    <div key={indice} style={{ color: "black" }}>{dia}</div>
                ))}
            </div>
            <div className="calendarioGrid">
                {celulasCompletas.map((celula, indice) => (
                    celula === null ? <div key={indice}></div> : <div
                        key={indice}
                        style={{
                            backgroundColor: `rgba(34, 197, 94, ${celula.porcentagem / 100})`,
                            color: "black",
                            border: celula.dia === hoje ? "3px solid rgb(36, 17, 17)" : "none"
                        }}
                    >
                        {new Date(celula.dia + "T00:00:00").getDate()}
                    </div>))}
            </div>
        </div>
    )
}

export default Calendario 