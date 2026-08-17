import { BrowserRouter, Routes, Route } from "react-router"
import Habitos from "./components/habitos.jsx"
import './estilos/App.css';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/habitos" element={<Habitos />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App