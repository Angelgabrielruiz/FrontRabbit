import React, { useEffect, useState } from "react";
import { usePagoViewModel } from "../ViewModel/pago_viewmodel";

export default function PagoCard() {
  const { pagos, formData, handleInputChange, handleSubmit, handleEdit, handleDelete } = usePagoViewModel();
  const [socketMessage, setSocketMessage] = useState("");

  const mappedPagos = pagos.map((pago) => ({
    id: pago.id,
    cambio: pago.cambio,
    fecha: pago.fecha,
    monto: pago.monto,
    pago: pago.pago,
  }));

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081/ws");

    socket.onmessage = (event) => {
      setSocketMessage(event.data);
    };

    socket.onopen = () => {
      console.log("Conectado al WebSocket");
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada");
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Función para parsear el string contenido
  // Transforma: "Pago creado: Monto 500, Pago 300, Cambio 200, Fecha 12/23/212"
  // En: { monto: "500", pago: "300", cambio: "200", fecha: "12/23/212" }
  const parseContenido = (contenido) => {
    const cleaned = contenido.replace("Pago creado:", "").trim();
    const parts = cleaned.split(",");
    let result = {};
    parts.forEach((part) => {
      const [key, ...rest] = part.trim().split(" ");
      result[key.toLowerCase()] = rest.join(" ");
    });
    return result;
  };

  // Renderiza el mensaje del WebSocket con un diseño mejorado
  const renderSocketMessage = () => {
    try {
      const data = JSON.parse(socketMessage);
      if (data.contenido) {
        const parsedData = parseContenido(data.contenido);
        return (
          <div className="p-4 border border-green-300 rounded-lg shadow bg-green-50">
            <h3 className="text-xl font-bold text-green-700 mb-2">Pago Creado</h3>
            <p>
              <span className="font-semibold">Monto:</span> {parsedData.monto}
            </p>
            <p>
              <span className="font-semibold">Pago:</span> {parsedData.pago}
            </p>
            <p>
              <span className="font-semibold">Cambio:</span> {parsedData.cambio}
            </p>
            <p>
              <span className="font-semibold">Fecha:</span> {parsedData.fecha}
            </p>
          </div>
        );
      }
      return <p>{socketMessage}</p>;
    } catch (error) {
      return <p>{socketMessage}</p>;
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Gestión de Pagos</h2>

      {socketMessage && (
        <div className="mb-4">
          {renderSocketMessage()}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="cambio"
          value={formData.cambio || ""}
          onChange={(e) => handleInputChange(e.target.name, parseInt(e.target.value))}
          placeholder="Cambio"
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="text"
          name="fecha"
          value={formData.fecha || ""}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          placeholder="Fecha"
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="number"
          name="monto"
          value={formData.monto || ""}
          onChange={(e) => handleInputChange(e.target.name, parseInt(e.target.value))}
          placeholder="Monto"
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="number"
          name="pago"
          value={formData.pago || ""}
          onChange={(e) => handleInputChange(e.target.name, parseInt(e.target.value))}
          placeholder="Pago"
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg w-full transition">
          {formData.id ? "Actualizar Pago" : "Agregar Pago"}
        </button>
      </form>

      <ul className="mt-6 space-y-3">
        {mappedPagos.length > 0 ? (
          mappedPagos.map((pago) => (
            <li key={pago.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-md">
              <div className="text-gray-700">
                <strong className="text-lg">{pago.fecha}</strong>
                <p className="text-sm">
                  Monto: <span className="font-semibold">{pago.monto}</span>
                </p>
                <p className="text-sm">
                  Pago: <span className="font-semibold">{pago.pago}</span>
                </p>
                <p className="text-sm">
                  Cambio: <span className="font-semibold">{pago.cambio}</span>
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-3 py-2 rounded-lg transition"
                  onClick={() => handleEdit(pago)}
                >
                  ✏️
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-2 rounded-lg transition"
                  onClick={() => handleDelete(pago.id)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No hay pagos registrados.</p>
        )}
      </ul>
    </div>
  );
}
