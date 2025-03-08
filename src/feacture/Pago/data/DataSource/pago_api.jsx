const API_URL = "http://localhost:8080/pagos";

export const PagoAPI = {
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener los pagos");
      return await response.json();
    } catch (error) {
      console.error("Error en getAll:", error);
      return [];
    }
  },

  create: async (pago) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pago),
      });

      if (!response.ok) throw new Error("Error al hacer el pago");
      return await response.json();
    } catch (error) {
      console.error("Error en create:", error);
    }
  },

  update: async (id, pago) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pago),
      });

      if (!response.ok) throw new Error("Error al actualizar el pago");
      return await response.json();
    } catch (error) {
      console.error("Error en update:", error);
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el pago");
      return true;
    } catch (error) {
      console.error("Error en delete:", error);
      return false;
    }
  },
};