import { useEffect, useState } from "react";
import '../estilos/app.css';


function EstatisticaDia() {
    const [dia, setDia] = useState({})

    useEffect(() => {
        async function buscarDadosDia() {
            const resposta = await fetch('http://localhost:3220/habitos/estatisticas/dias')
            const dados = await resposta.json()
            setDia(dados)
        }
        buscarDadosDia()
    }, [])

    return (
        <div className="barraFundo">
            <div className="barraPreenchida" style={{width: `${dia.porcentagem}%`}}></div>
        </div>
    )
}

export default EstatisticaDia