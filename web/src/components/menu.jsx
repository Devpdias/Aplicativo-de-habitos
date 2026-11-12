import { NavLink } from "react-router";
import { PanelLeft } from 'lucide-react';
import { House } from 'lucide-react';



function classeDoLink({ isActive }) {
    const base = "flex items-center gap-2 px-3 py-2 rounded-md border-l-4 hover:bg-white/10"
    return isActive
        ? `${base} border-purple-400 bg-white/10`
        : `${base} border-transparent`
}

function Menu({ aberto, aoMudar }) {

    return (
        <nav className={`shrink-0 bg-[#1f2028] flex flex-col gap-1 overflow-hidden whitespace-nowrap transition-all duration-300 ${aberto ? "w-60 p-3" : "w-0 p-0"}`}>
            <button onClick={aoMudar}><PanelLeft className="size-5 shrink-0 mb-3" /></button>
            <NavLink to="/" className={classeDoLink}><House className="size-4 shrink-0" /> Página inicial</NavLink>
            <NavLink to="/habitos" className={classeDoLink}>Hábitos</NavLink>
            <NavLink to="/importantes" className={classeDoLink}>Importantes</NavLink>
        </nav>
    )
}

export default Menu