import { PagoRepository } from "../../data/Repository/pago_repository";

export const getPago = async () => {
  const pago = await PagoRepository.getPago();
  console.log("Productos obtenidos en getAllProducts:", pago);
  return pago;
};
