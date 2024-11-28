import React from "react";
import { useNavigate } from "react-router-dom";
import SensorCard from "../components/SensorCard";
import "../styles/Menu.css";

const Menu = ({ userName }) => {
    const navigate = useNavigate();

    return (
        <div className="menu-container">
            <div className="menu-header">
                <h1>Olá, {userName || "[user]"}</h1>
                <div className="menu-buttons">
                    <button className="sair" onClick={() => navigate("/")}>Sair</button>
                    <button className="cadastro" onClick={() => navigate("/cadastro")}>Cadastrar</button>
                </div>
            </div>
            <div className="sensor-cards">
                {/* Renderiza os SensorCard sem passar os dados diretamente */}
                <SensorCard type="Temperatura" />
                <SensorCard type="Umidade" />
            </div>
        </div>
    );
};

export default Menu;
