import { Outlet } from "react-router"
import Menu from './menu.jsx'

function Layout() {
    return (
        <div>
            <Menu />
            <Outlet />
        </div>
    )
}

export default Layout