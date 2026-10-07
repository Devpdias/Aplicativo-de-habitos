import { useEffect, useState } from "react"
import CriarHabito from "./criarHabito"
import EstatisticaDia from "./estatisticaDia"
import Calendario from "./calendario"

function Habitos() {

    const [habito, setHabito] = useState([])
    const [posicao, setPosicao] = useState(null)
    const [estatisticaDia, setEstatisticaDia] = useState({})
    const [editando, setEditando] = useState(null)
    const [novoNome, setNovoNome] = useState("")

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

    async function atualizarImportante(id) {
        const atualizar = await fetch(`http://localhost:3220/habitos/${id}/importante`, {
            method: "PATCH",
        })
        const resposta = await atualizar.json()
        setHabito(habito.map((item) => (
            item.id === id ? { ...item, importante: resposta.importante }
                : item
        )))
    }

    async function deleteHabito(id) {
        const resposta = await fetch(`http://localhost:3220/habitos/${id}`, {
            method: "DELETE"
        })
        setHabito(habito.filter((item) => item.id !== id))
    }

    useEffect(() => {
        function fecharMenu() {
            setPosicao(null)
            setEditando(null)
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

    async function atualizarNome(id) {
        const resposta = await fetch(`http://localhost:3220/habitos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ novoNome: novoNome })
        })
        setHabito(habito.map((item) => (
            item.id === id ? { ...item, nome: novoNome } : item
        )))
        setEditando(null)
    }

    return (
        <>
            <div>
                <h1>Meus Hábitos</h1>
                <Calendario></Calendario>
                <EstatisticaDia dados={estatisticaDia}></EstatisticaDia>
                <CriarHabito aoCriar={criarHabito} />
                <div>
                    {habito.sort((a, b) => b.importante - a.importante).map((item) => (
                        <div key={item.id} onContextMenu={(e) => {
                            e.preventDefault()
                            setPosicao({ x: e.clientX, y: e.clientY, id: item.id })
                        }}>
                            {
                                editando === item.id ? <input type="text" value={novoNome} onChange={(e) => setNovoNome(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            atualizarNome(item.id)
                                        }
                                    }} />
                                    : <span>{item.nome}</span>
                            }
                            <input type="checkbox" checked={item.concluidoHoje}
                                onChange={() => { atualizarCheck(item.id) }} />
                            <input type="checkBox" className="checkboxEstrela" checked={item.importante}
                                onChange={() => { atualizarImportante(item.id) }} />
                        </div>
                    ))}
                    {
                        posicao && (
                            <div className="menuContexto" style={{
                                left: posicao.x,
                                top: posicao.y,
                            }}>
                                <div className="showHabito" onClick={() => { deleteHabito(posicao.id) }}>
                                    Excluir Hábito
                                </div>{/* checar porque não aparece por completo esta parte */}
                                <div className="showHabito" onClick={(e) => {
                                    e.stopPropagation()
                                    setEditando(posicao.id)
                                    const habitoEncontrado = habito.find((item) => item.id === posicao.id)
                                    setNovoNome(habitoEncontrado.nome)
                                }}>
                                    Editar Hábito
                                </div>{ /*1-fazer que o input apareça vazio e estilizado
                                2- fazer que eu consiga digitar direto
                                3- fazer que o menu de contexto desapareça após o enter
                                */}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Habitos