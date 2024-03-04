'use client';

import Form from "../form";
import { Input } from "../inputs";
import { createSupplierAction } from "@/lib/actions/suppliers";
import useFormHandler from "@/lib/hooks";

export default function SupplierCreateForm() {
  const [state, formAction] = useFormHandler('Crear proveedor', '/home/suppliers',  createSupplierAction)

  return (
    <Form action={formAction} returnTo="/home/suppliers">
      <Input
        placeholder="Nombre"
        state={state}
        requiredInput
        name="name"
        htmlFor="name"
        errorFor="name-error"
        label="Nombre"
      />
      <Input
        placeholder="Telefono"
        state={state}
        name="tel"
        htmlFor="tel"
        errorFor="tel-error"
        label="Telefono"
      />
      <Input
        placeholder="example@gmail.com"
        state={state}
        name="email"
        htmlFor="email"
        errorFor="email-error"
        label="Email"
      />
      <Input
        placeholder="Direccion"
        state={state}
        name="address"
        htmlFor="address"
        errorFor="address-error"
        label="Direccion"
      />
    </Form>
  )
}