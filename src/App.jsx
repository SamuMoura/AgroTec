import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./screens/Menu";
import Cadastro from "./screens/Cadastro";
import Login from "./screens/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/menu" element={<Menu userName="Usuário" />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


// Horas trabalhadas: 10h