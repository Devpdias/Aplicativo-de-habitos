import { Outlet } from "react-router"
import Menu from './menu.jsx'

function Layout() {
    return (
        <div className="flex h-screen">
            <Menu />
            <main className="flex-1 overflow-auto p-6" >
                <Outlet />
            </main>
        </div>
    )
}

export default Layout