import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Cadastro.css"

const Cadastro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ip: "",
        codigoESP: "",
        localizacao: "",
        tipoSensor: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados cadastrados:", formData);
        // Lógica de cadastro aqui
    };

    return (
        <div className="cadastro-container">
            <form className="cadastro-form" onSubmit={handleSubmit}>
                <h1>Cadastro de ESP</h1>
                <input
                    type="text"
                    name="ip"
                    placeholder="IP"
                    value={formData.ip}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="codigoESP"
                    placeholder="Código ESP"
                    value={formData.codigoESP}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="localizacao"
                    placeholder="Localização"
                    value={formData.localizacao}
                    onChange={handleChange}
                />
                <select
                    name="tipoSensor"
                    value={formData.tipoSensor}
                    onChange={handleChange}
                >
                    <option value="">Tipo de Sensor</option>
                    <option value="temperatura">Temperatura</option>
                    <option value="umidade">Umidade</option>
                    <option value="outro">Outro</option>
                </select>
                <div className="button-group">
                    <button type="submit" className="cadastrar-button">
                        Cadastrar
                    </button>
                    <button
                        type="button"
                        className="voltar-button"
                        onClick={() => navigate("/menu")}
                    >
                        Voltar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
