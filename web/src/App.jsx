import { BrowserRouter, Routes, Route } from "react-router"
import Habitos from "./components/habitos.jsx"
import Importantes from "./components/importantes.jsx";
import './estilos/App.css';
import Layout from './components/layout.jsx'
import Inicial from "./components/telaInicial.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Inicial />} />
                    <Route path="/habitos" element={<Habitos />} />
                    <Route path="/importantes" element={<Importantes />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App