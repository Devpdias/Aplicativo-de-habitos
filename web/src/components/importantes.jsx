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

    return (
        <div>
            <h1>Hábitos Importantes</h1>
            {habitoImportante.map((item) => (
                <div key={item.id}>
                    <span>{item.nome}</span>
                </div>
            ))}
        </div>
    )
}

export default Importantes