import { BrowserRouter, Routes, Route } from "react-router"
import CriarHabito from "./criarHabito.jsx"
import Habitos from "./habitos.jsx"
import './App.css'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CriarHabito />} />
                <Route path="/habitos" element={<Habitos />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App