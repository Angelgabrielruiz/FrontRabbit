export class Pago {
  id = null;
  cambio = 0;
  fecha = "";
  monto = 0;
  pago = 0;

  constructor(id = null, cambio = 0, fecha = "", monto = 0, pago = 0) {
    this.id = id;
    this.cambio = cambio;
    this.fecha = fecha;
    this.monto = monto;
    this.pago = pago;
  }
}
