import { NavLink } from "react-router";


function Menu() {
    return (
        <nav>
            <NavLink to="/habitos">Hábitos</NavLink>
            <NavLink to="/importantes">Importantes</NavLink>
        </nav>
    )
}

export default Menu