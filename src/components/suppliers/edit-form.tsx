"use client";

import { Supplier } from "@/lib/definitions";
import Form from "../form";
import useFormHandler from "@/lib/hooks";
import { updateSupplierAction } from "@/lib/actions/suppliers";
import { Input } from "../inputs";
import { SUPPLIERS_ROUTE } from "@/lib/constants";

export default function UpdateSupplierForm({ supplier }: { supplier: Supplier }) {
  const [state, formAction] = useFormHandler('Editar proveedor', SUPPLIERS_ROUTE, updateSupplierAction)
  return (
    <Form action={formAction} returnTo={SUPPLIERS_ROUTE}>
      <Input className="hidden" type="hidden" name="id" htmlFor="name" defaultValue={supplier.id} />
      <Input
        name="name"
        htmlFor="name"
        errorFor="name-error"
        label="Nombre"
        placeholder="Nombre"
        requiredInput
        defaultValue={supplier.name}
        state={state}
      />
      <Input
        name="tel"
        htmlFor="tel"
        errorFor="tel-error"
        label="Telefono"
        placeholder="Telefono"
        defaultValue={supplier.tel || undefined}
        state={state}
      />
      <Input
        name="email"
        htmlFor="email"
        errorFor="email-error"
        label="Email"
        placeholder="example@gmail.com"
        defaultValue={supplier.email || undefined}
        state={state}
      />
      <Input
        name="address"
        htmlFor="address"
        errorFor="address-error"
        label="Direccion"
        placeholder="Direccion"
        defaultValue={supplier.address || undefined}
        state={state}
      />
    </Form>
  )
}