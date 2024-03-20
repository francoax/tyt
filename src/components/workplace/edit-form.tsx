'use client';

import { updateWorkplaceAction } from "@/lib/actions/workplace";
import { WORKPLACES_ROUTE } from "@/lib/constants";
import useFormHandler from "@/lib/hooks";
import Form from "../form";
import { Input } from "../inputs";
import { Workplace } from "@/lib/definitions";

export default function UpdateWorkplaceForm({ workplace } : { workplace: Workplace }) {
  const [state, formAction] = useFormHandler(
    'Editar empresa',
    WORKPLACES_ROUTE,
    updateWorkplaceAction
  )

  return (
    <Form action={formAction} returnTo={WORKPLACES_ROUTE}>
      <Input type="hidden" className="hidden" name="id" htmlFor="name" defaultValue={workplace.id} />
      <Input
        name="name"
        htmlFor="name"
        errorFor="name-error"
        placeholder="Nombre"
        state={state}
        requiredInput
        label="Nombre de empresa"
        defaultValue={workplace.name}
      />
      <Input
        name="address"
        htmlFor="address"
        errorFor="address-error"
        placeholder="Direccion"
        state={state}
        label="Direccion de empresa"
        defaultValue={workplace.address ?? ""}
      />
    </Form>
  )
}