'use client';

import { createWorkplaceAction } from "@/lib/actions/workplace";
import { WORKPLACES_ROUTE } from "@/lib/constants";
import useFormHandler from "@/lib/hooks";
import Form from "../form";
import { Input } from "../inputs";

export default function CreateWorkplaceForm() {
  const [state, formAction] = useFormHandler(
    'Crear empresa',
    WORKPLACES_ROUTE,
    createWorkplaceAction
  )

  return (
    <Form action={formAction} returnTo={WORKPLACES_ROUTE}>
      <Input
        name="name"
        htmlFor="name"
        errorFor="name-error"
        placeholder="Nombre"
        state={state}
        requiredInput
        label="Nombre de empresa"
      />
      <Input
        name="address"
        htmlFor="address"
        errorFor="address-error"
        placeholder="Direccion"
        state={state}
        label="Direccion de empresa"
      />
    </Form>
  )
}