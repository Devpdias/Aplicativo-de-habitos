import { useEffect, useState } from "react"
import CriarHabito from "./criarHabito"
import EstatisticaSemana from "./estatisticaSemana"

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

    async function criarHabito(nome) {
        const resposta = await fetch("http://localhost:3220/habitos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome
            })
        })

        const habitoNovo = await resposta.json()
        setHabito([...habito, habitoNovo])
    }

    async function atualizarCheck(id) {
        const atualizar = await fetch(`http://localhost:3220/habitos/${id}/registros`, {
            method: "PATCH",
        });
        const resposta = await atualizar.json()
        setHabito(habito.map((item) => (
            item.id === id ? { ...item, concluidoHoje: resposta.concluido }
                : item
        )))
    };

    async function deleteHabito(id) {
        const resposta = await fetch(`http://localhost:3220/habitos/${id}`, {
            method: "DELETE"
        })
        setHabito(habito.filter((item) => item.id !== id))
    }

    useEffect(() => {
        function fecharMenu() {
            setPosicao(null)
        }
        document.addEventListener("click", fecharMenu)

        return () => {
            document.removeEventListener("click", fecharMenu)
        }
    }, [])

    return (
        <>
            <div>
                <h1>Meus Hábitos</h1>
                <EstatisticaSemana></EstatisticaSemana>
                <CriarHabito aoCriar={criarHabito} />
                <div>
                    {habito.map((item) => (
                        <div key={item.id} onContextMenu={(e) => {
                            e.preventDefault()
                            setPosicao({ x: e.clientX, y: e.clientY, id: item.id })
                        }}>
                            <span>{item.nome}</span>
                            <input type="checkbox" checked={item.concluidoHoje}
                                onChange={() => {atualizarCheck(item.id)}} />
                        </div>
                    ))}
                    {
                        posicao && (
                            <div className="showHabito" onClick={() => { deleteHabito(posicao.id) }} style={{
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