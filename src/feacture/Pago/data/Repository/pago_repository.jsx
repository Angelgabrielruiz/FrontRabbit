import { PagoAPI } from "../DataSource/pago_api";

export const PagoRepository = {
  getPago: async () => await PagoAPI.getAll(),
  addPago: async (pago) => await PagoAPI.create(pago),
  updatePago: async (id, pago) => await PagoAPI.update(id, pago),
  deletePago: async (id) => await PagoAPI.delete(id),
};
