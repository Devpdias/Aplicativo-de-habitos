import { NavLink } from "react-router";


function classeDoLink({ isActive }) {
    const base = "px-3 py-2 rounded-md border-l-4 hover:bg-white/10"
    return isActive
        ? `${base} border-purple-400 bg-white/10`
        : `${base} border-transparent`
}

function Menu() {
    return (
        <nav className="w-60 shrink-0 bg-[#1f2028] p-3 flex flex-col gap">
            <NavLink to="/habitos" className={classeDoLink}>Hábitos</NavLink>
            <NavLink to="/importantes" className={classeDoLink}>Importantes</NavLink>
        </nav>
    )
}

export default Menu