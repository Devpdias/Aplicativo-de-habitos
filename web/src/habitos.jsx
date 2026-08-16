import { useEffect, useState } from "react"

function Habitos() {

    const [habito, setHabito] = useState([])
    const [posicao, setPosicao] = useState(null)

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

    async function deleteHabito(id){
        const resposta = await fetch(`http://localhost:3220/habitos/${id}`, {
            method: "DELETE"
        })
        setHabito(habito.filter((item) => item.id !== id))
        setPosicao(null)
    }

    return (
        <>
            <div onClick={() => setPosicao(null)}>
                <h1>Meus Hábitos</h1>
                <div>
                    {habito.map((item) => (
                        <div key={item.id} onContextMenu={(e) => {
                            e.preventDefault()
                            setPosicao({ x: e.clientX, y: e.clientY, id: item.id })
                        }}>
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
                    {
                        posicao && (
                            <div className="showHabito" onClick={() => {deleteHabito(posicao.id)}} style={{
                                left: posicao.x,
                                top: posicao.y,
                            }}>
                                Excluir Hábito
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Habitos