import '../estilos/app.css';


function EstatisticaDia({dados}) {

    return (
        <div className="barraFundo">
            <div className="barraPreenchida" style={{width: `${dados.porcentagem}%`}}></div>
        </div>
    )
}

export default EstatisticaDia