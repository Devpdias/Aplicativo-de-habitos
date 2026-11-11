import { NavLink } from "react-router";
import { PanelLeft } from 'lucide-react';


function classeDoLink({ isActive }) {
    const base = "px-3 py-2 rounded-md border-l-4 hover:bg-white/10"
    return isActive
        ? `${base} border-purple-400 bg-white/10`
        : `${base} border-transparent`
}

function Menu({ aberto, aoMudar }) {

    return (
        <nav className={`shrink-0 bg-[#1f2028] flex flex-col gap-1 overflow-hidden whitespace-nowrap transition-all duration-300 ${aberto ? "w-60 p-3" : "w-0 p-0"}`}>
            <button onClick={ aoMudar }><PanelLeft /></button>
            <NavLink to="/habitos" className={classeDoLink}>Hábitos</NavLink>
            <NavLink to="/importantes" className={classeDoLink}>Importantes</NavLink>
        </nav>
    )
}

export default Menu