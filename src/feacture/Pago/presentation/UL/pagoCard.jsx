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

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Gestión de Pagos</h2>

      {socketMessage && (
        <p className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center mb-4">
          📢 {socketMessage}
        </p>
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
                <p className="text-sm">Monto: <span className="font-semibold">{pago.monto}</span></p>
                <p className="text-sm">Pago: <span className="font-semibold">{pago.pago}</span></p>
                <p className="text-sm">Cambio: <span className="font-semibold">{pago.cambio}</span></p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-3 py-2 rounded-lg transition" onClick={() => handleEdit(pago)}>✏️</button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-2 rounded-lg transition" onClick={() => handleDelete(pago.id)}>🗑️</button>
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
