import { useEffect, useState } from "react"

function Habitos() {

    const [habito, setHabito] = useState([])

    useEffect(() => {
        async function buscaDeHabitos() {
            const resposta = await fetch('http://localhost:3220/habitos')
            const dados = await resposta.json()
            setHabito(dados)
        }
        buscaDeHabitos()
    }, [])

    async function atualizarCheck(id, novoValor) {
        const atualizar = await fetch(`http://localhost:3220/habitos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                concluido: novoValor
            })
        });
    };

    return (
        <>
            <div>
                <h1>Meus Hábitos</h1>
                <div>
                    {habito.map((item) => (
                        <div key={item.id}>
                            <span>{item.nome}</span>
                            <input type="checkbox" checked={item.concluido}
                                onChange={(e) => {
                                    setHabito(habito.map((item2) => (
                                        item2.id === item.id ? { ...item2, concluido: e.target.checked }
                                            : item2
                                    )))
                                    atualizarCheck(item.id, e.target.checked)
                                }} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Habitos