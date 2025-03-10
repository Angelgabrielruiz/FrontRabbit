//File: pago_viewmodel.jsx

import { useState, useEffect } from "react";
import { createPago } from "../../domain/UseCase/createPago_useCase";
import { PagoRepository } from "../../data/Repository/pago_repository";

export const usePagoViewModel = () => {
  const [pagos, setPagos] = useState([]);
  const [formData, setFormData] = useState({ id: null, cambio: 0, fecha: "", monto: 0, pago: 0 });

  useEffect(() => {
    loadPagos();
  }, []);

  const loadPagos = async () => {
    const pagosData = await PagoRepository.getPago();
    if (Array.isArray(pagosData)) setPagos(pagosData);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...pagoData } = formData;
    if (id) await PagoRepository.updatePago(id, formData);
    else await createPago(pagoData);
    setFormData({ id: null, cambio: 0, fecha: "", monto: 0, pago: 0 });
    loadPagos();
  };

  const handleEdit = (pago) => setFormData(pago);
  const handleDelete = async (id) => { if (await PagoRepository.deletePago(id)) loadPagos(); };

  return { pagos, formData, handleInputChange, handleSubmit, handleEdit, handleDelete };
};