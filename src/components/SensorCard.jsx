import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import "../styles/SensorCard.css";

const HeatmapLayer = ({ data }) => {
    const map = useMap();

    useEffect(() => {
        const heat = L.heatLayer(data, {
            radius: 25,
            blur: 15,
            maxZoom: 17,
        });

        heat.addTo(map);

        return () => {
            map.removeLayer(heat);
        };
    }, [data, map]);

    return null;
};

const SensorCard = ({ type }) => {
    const [sensorData, setSensorData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para buscar os dados
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulação de requisição para obter dados do sensor
                const response = await new Promise((resolve) =>
                    setTimeout(() => {
                        if (type === "Temperatura") {
                            resolve({
                                esp: "ESP-01",
                                value: "24",
                                unit: "°C",
                                location: { lat: -22.9093227, lng: -47.0567614 },
                                heatmapData: [
                                    [-22.9093227, -47.0567614, 0.8],
                                    [-22.9100000, -47.0550000, 0.6],
                                    [-22.9110000, -47.0580000, 0.9],
                                ],
                            });
                        } else if (type === "Umidade") {
                            resolve({
                                esp: "ESP-02",
                                value: "0.24",
                                unit: "kPa",
                                location: { lat: -22.9093227, lng: -47.0567614 },
                                heatmapData: [
                                    [-22.9093227, -47.0567614, 0.7],
                                    [-22.9105000, -47.0570000, 0.6],
                                    [-22.9110000, -47.0540000, 0.8],
                                ],
                            });
                        }
                    }, 1000)
                );
                setSensorData(response);
            } catch (error) {
                console.error("Erro ao buscar dados do sensor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    if (loading) {
        return <div className="sensor-card">Carregando dados...</div>;
    }

    if (!sensorData) {
        return <div className="sensor-card">Erro ao carregar dados.</div>;
    }

    const { esp, value, unit, location, heatmapData } = sensorData;

    return (
        <div className="sensor-card">
            <div className="card-header">
                <button className="toggle-button" onClick={() => console.log(`${type} toggled!`)}>
                    {type} ▼
                </button>
            </div>
            <div className="map-container">
                <MapContainer
                    center={[location.lat, location.lng]}
                    zoom={13}
                    style={{ height: "300px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    <HeatmapLayer data={heatmapData} />
                </MapContainer>
            </div>
            <div className="card-details">
                <p><strong>ESP:</strong> {esp}</p>
                <p>
                    <strong>{type}:</strong> {value} {unit}
                </p>
                <p>
                    <strong>Localização:</strong> {location.lat}, {location.lng}
                </p>
            </div>
        </div>
    );
};

export default SensorCard;
