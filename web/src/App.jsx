import { BrowserRouter, Routes, Route } from "react-router"
import Habitos from "./components/habitos.jsx"
import Importantes from "./components/importantes.jsx";
import './estilos/App.css';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/habitos" element={<Habitos />} />
                <Route path="/importantes" element={<Importantes/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App