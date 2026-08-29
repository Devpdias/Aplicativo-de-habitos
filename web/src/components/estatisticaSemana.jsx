import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

function EstatisticaSemana() {
    const [semana, setSemana] = useState([])

    useEffect(() => {
        async function buscarDadosSemana() {
            const resposta = await fetch('http://localhost:3220/habitos/estatisticas/semana')
            const dados = await resposta.json()
            setSemana(dados.EstatisticaSemana)
        }
        buscarDadosSemana()
    }, [])


    return (
        <div>
            <h2>Estatistica da semana</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={semana}>
                    <XAxis dataKey="dia" tickFormatter={(valor) => new Date(valor).toLocaleDateString('pt-BR', { weekday: 'short' })} />
                    <YAxis tickFormatter={(valor) => `${valor}%`} />
                    <Bar dataKey="porcentagem" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EstatisticaSemana