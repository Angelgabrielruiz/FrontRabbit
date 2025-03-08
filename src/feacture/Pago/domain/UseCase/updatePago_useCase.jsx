
import { PagoRepository } from "../../data/Repository/pago_repository";

export const updatePago = async (id, pago) => {
  return await PagoRepository.updatePago(id, pago);
};
