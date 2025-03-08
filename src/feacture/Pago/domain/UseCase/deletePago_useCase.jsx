import { PagoRepository } from "../../data/Repository/pago_repository";

export const deletePago = async (id) => {
  return await PagoRepository.deletePago(id);
};
