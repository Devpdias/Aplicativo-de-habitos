import { useEffect ,useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';


function EstatisticaMes() {
    const [estatisticaMes, setEstatisticaMes] = useState([])

    useEffect(() => {
        async function buscarEstatisticaMes() {
            const resposta = await fetch('http://localhost:3220/habitos/estatisticas/mes')
            const dados = await resposta.json()
            setEstatisticaMes(dados.estatisticaMes)
        }
        buscarEstatisticaMes()
    }, [])

    return (
        <div>
            <h2>Estatistica do Mes</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={estatisticaMes}>
                    <XAxis dataKey="dia" tickFormatter={(valor) => new Date(valor + "T00:00:00").getDate()}/>
                    <YAxis tickFormatter={(valor) => `${valor}%`} />
                    <Bar dataKey="porcentagem" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EstatisticaMes