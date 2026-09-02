import { useEffect, useState } from "react"
import CriarHabito from "./criarHabito"
import EstatisticaSemana from "./estatisticaSemana"
import EstatisticaDia from "./estatisticaDia"
import EstatisticaMes from "./estatisticaMes"

function Habitos() {

    const [habito, setHabito] = useState([])
    const [posicao, setPosicao] = useState(null)
    const [estatisticaDia, setEstatisticaDia] = useState({})

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
        buscarEstatisticaDia()
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

    async function buscarEstatisticaDia() {
        const resposta = await fetch('http://localhost:3220/habitos/estatisticas/dias')
        const dados = await resposta.json()
        setEstatisticaDia(dados)
    }

    useEffect(() => {
        buscarEstatisticaDia()
    }, [])

    return (
        <>
            <div>
                <h1>Meus Hábitos</h1>
                <EstatisticaDia dados={estatisticaDia}></EstatisticaDia>
                <CriarHabito aoCriar={criarHabito} />
                <div>
                    {habito.map((item) => (
                        <div key={item.id} onContextMenu={(e) => {
                            e.preventDefault()
                            setPosicao({ x: e.clientX, y: e.clientY, id: item.id })
                        }}>
                            <span>{item.nome}</span>
                            <input type="checkbox" checked={item.concluidoHoje}
                                onChange={() => { atualizarCheck(item.id) }} />
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