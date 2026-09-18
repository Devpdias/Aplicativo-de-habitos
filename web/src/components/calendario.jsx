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
}

export default Calendario 