import { PagoRepository } from "../../data/Repository/pago_repository";

export const createPago = async (pago) => {
  return await PagoRepository.addPago(pago);
};
