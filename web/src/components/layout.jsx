import { Outlet } from "react-router"
import Menu from './menu.jsx'
import { useState } from "react"

function Layout() {

    const [aberto, setAberto] = useState(true)

    function mudarAberto() {
        setAberto(!aberto)
    }

    return (
        <div className="flex h-screen">
            <Menu aberto={aberto} aoMudar={mudarAberto} />
            <main className="flex-1 overflow-auto p-6" >
                {!aberto && (
                    < button onClick={mudarAberto} className="mb-4 text-2xl sticky top-0 z-10 bg-[#16171d]">{/* retirar bg quando configurar tudo */}
                        ☰
                    </button>
                )
                }
                <Outlet />
            </main>
        </div >
    )
}

export default Layout