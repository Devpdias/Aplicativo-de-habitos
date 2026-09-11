import { useState, useEffect } from "react";

function Importantes() {
    const [habitoImportante, setHabitoImportante] = useState([])

    useEffect(() => {
        async function buscarImportantes() {
            const resposta = await fetch('http://localhost:3220/habitos/importantes')
            const dados = await resposta.json()
            setHabitoImportante(dados.habitosImportantes)
        }
        buscarImportantes()
    }, [])

    async function atualizarCheck(id) {
        const atualizar = await fetch(`http://localhost:3220/habitos/${id}/registros`, {
            method: "PATCH",
        });
        const resposta = await atualizar.json()
        setHabitoImportante((atual) => atual.map((item) => (
            item.id === id ? { ...item, concluidoHoje: resposta.concluido } : item
        )))
    };

    return (
        <div>
            <h1>Hábitos Importantes</h1>
            {habitoImportante.map((item) => (
                <div key={item.id}>
                    <span>{item.nome}</span>
                    <input type="checkbox" checked={item.concluidoHoje}
                        onChange={() => { atualizarCheck(item.id) }} />
                </div>
            ))}
        </div>
    )
}

export default Importantes