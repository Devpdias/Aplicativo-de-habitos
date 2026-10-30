import { useEffect, useState } from "react"

function Streak({ habitoId, concluidoHoje }) {
    const [streak, setStreak] = useState(0)

    useEffect(() => {
        async function buscarStreak() {
            const resposta = await fetch(`http://localhost:3220/habitos/${habitoId}/streak`)
            if (resposta.ok) {
                const dados = await resposta.json()
                setStreak(dados.habitoStreak)
            }
        }
        buscarStreak()
    }, [habitoId, concluidoHoje])

    if (streak <= 0) {
        return null
    }

    return <span> {streak}🔥 </span>
}

export default Streak