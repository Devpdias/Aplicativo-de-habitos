import '../estilos/app.css';


function EstatisticaDia({ dados }) {

    return (
        <div>
            <div>{dados.numHabitos === 0 ? <p>lista não possui hábitos</p> : <p>{dados.numHabitosFeitosHoje} de {dados.numHabitos} Tarefas feitas</p>}</div>
            <div className="barraFundo">
                <div className="barraPreenchida" style={{ width: `${dados.porcentagem}%` }}></div>
            </div>
        </div>
    )
}

export default EstatisticaDia