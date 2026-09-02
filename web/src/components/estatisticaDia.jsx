import '../estilos/app.css';


function EstatisticaDia({ dados }) {

    return (
        <div>
            <p>{dados.numHabitosFeitosHoje} de {dados.numHabitos} Tarefas feitas</p>
            <div className="barraFundo">
                <div className="barraPreenchida" style={{ width: `${dados.porcentagem}%` }}></div>
            </div>
        </div>
    )
}

export default EstatisticaDia